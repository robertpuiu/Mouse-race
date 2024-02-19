import { IGameShape } from 'src/shapes/shapes.model';
import { GameService } from './game.service';
import { Controller, Get, Delete, Param } from '@nestjs/common';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get('/getGameShapes/:gameid')
  getGameShapes(@Param('gameid') gameid: string): IGameShape[] {
    return this.gameService.allGameShapes(gameid);
  }
  @Get('/status/:gameid')
  getStatus(@Param('gameid') gameid: string): string {
    return this.gameService.getStatus(gameid);
  }
  @Delete(':gameid/delete')
  deleteAllShapes(@Param('gameid') gameid: string): void {
    this.gameService.deleteShapes(gameid);
  }
}
