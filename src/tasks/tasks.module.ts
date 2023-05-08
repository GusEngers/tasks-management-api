import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/task.schema';
import { IdMiddleware, QueryMiddleware } from './tasks.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(QueryMiddleware).forRoutes('tasks/filter');
    consumer
      .apply(IdMiddleware)
      .exclude({ path: 'tasks/filter', method: RequestMethod.GET })
      .forRoutes('tasks/:id');
  }
}
