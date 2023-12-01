import { Injectable } from '@nestjs/common';

@Injectable()
export class StartService {
  getShapes(x: number, y: number): number {
    return x + y;
  }

  heehe(): string {
    return 'hehe';
  }
}
