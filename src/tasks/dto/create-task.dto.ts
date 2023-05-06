import { Status } from '../types/status.enum';

export class CreateTaskDto {
  readonly name: string;
  readonly description: string;
  readonly status: Status;
}
