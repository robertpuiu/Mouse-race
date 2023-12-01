import { GameService } from './../game/game.service';
import { StartService } from './start.service';
import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';

@Controller('start')
export class StartController {
  constructor(
    private readonly startService: StartService,
    private readonly gameService: GameService,
  ) {}

  @Post(':width/:height')
  createElements(
    @Param('width', ParseIntPipe) width: number,
    @Param('height', ParseIntPipe) height: number,
  ): number {
    this.gameService.createElements(width, height);
    return this.startService.getShapes(width, height); //to change
  }
}
