import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<string> {
    const createdTask = new this.taskModel(createTaskDto);
    try {
      const task = await createdTask
        .save()
        .then(() => `Task ${createdTask.name} created!`);
      return task;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskModel.find().select('-__v');
      return tasks;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(id).select('-__v');
      if (!task) throw new Error(`Task with id ${id} not found`);
      return task;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
