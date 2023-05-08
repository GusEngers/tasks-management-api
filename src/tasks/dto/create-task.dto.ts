import { IsEnum, IsString } from 'class-validator';
import { Status } from '../types/status.enum';

export class CreateTaskDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsEnum(Status)
  readonly status: Status;
}
