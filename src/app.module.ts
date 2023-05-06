import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
