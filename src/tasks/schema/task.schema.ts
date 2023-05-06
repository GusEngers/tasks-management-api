import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Status } from '../types/status.enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
    enum: [Status.complete, Status.progress, Status.wait],
  })
  status: Status;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
