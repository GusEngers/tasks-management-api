import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schema/task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<string> {
    const response: string = await this.tasksService.create(createTaskDto);
    return response;
  }

  @Get()
  async findAll(): Promise<Task[]> {
    const response: Task[] = await this.tasksService.findAll();
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    const response: Task = await this.tasksService.findOne(id);
    return response;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const response: Task = await this.tasksService.update(id, updateTaskDto);
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    const response: string = await this.tasksService.remove(id);
    return response;
  }
}
