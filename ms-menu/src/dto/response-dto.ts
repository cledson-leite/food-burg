import { HttpStatus } from '@nestjs/common';

export interface Response<T> {
  status: HttpStatus;
  data?: T;
  error?: string;
}
