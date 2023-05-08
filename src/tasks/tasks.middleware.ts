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

@Injectable()
export class QueryMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (!req.query.type) {
      throw new HttpException(
        'The query with the name "type" is missing!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (![0, 1, 2].includes(+req.query.type)) {
      throw new HttpException(
        'Invalid value: Only 0, 1, or 2 are accepted!',
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}
