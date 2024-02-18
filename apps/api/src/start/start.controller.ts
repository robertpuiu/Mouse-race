import { GameService } from './../game/game.service';
import { StartService } from './start.service';
import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';

@Controller('start')
export class StartController {
  constructor(
    private readonly startService: StartService,
    private readonly gameService: GameService,
  ) {}

  @Post(':gameid/:width/:height')
  gameInit(
    @Param('gameid') gameid: string,
    @Param('width', ParseIntPipe) width: number,
    @Param('height', ParseIntPipe) height: number,
  ) {
    this.gameService.gameInit(gameid, width, height);
  }
}
