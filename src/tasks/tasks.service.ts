import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<string> {
    const createdTask = new this.taskModel(createTaskDto);
    try {
      const task: string = await createdTask
        .save()
        .then(() => `Task ${createdTask.name} created!`);
      return task;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      const tasks: Task[] = await this.taskModel.find().select('-__v');
      return tasks;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async filterAll(type: number): Promise<Task[]> {
    const tasks: Task[] = await this.taskModel
      .find({ status: type })
      .select('-__v');
    return tasks;
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task: Task = await this.taskModel.findById(id).select('-__v');
      if (!task) throw new Error(`Task with id ${id} not found!`);
      return task;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const task: Task = await this.taskModel
        .findByIdAndUpdate(id, updateTaskDto, { new: true })
        .select('-__v');
      if (!task) throw new Error(`Task with id ${id} not found!`);
      return task;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const task: Task = await this.taskModel.findByIdAndDelete(id);
      if (!task) throw new Error(`Task with id ${id} not found!`);
      return `Task '${task.name}' was successfully deleted!`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
