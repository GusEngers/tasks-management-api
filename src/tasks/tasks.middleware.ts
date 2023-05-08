import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class IdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (!isValidObjectId(req.params.id)) {
      throw new HttpException(
        'The id format is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}
