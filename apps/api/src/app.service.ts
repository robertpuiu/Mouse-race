import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getShapes(x: number, y: number): number {
    return x + y;
  }
}
