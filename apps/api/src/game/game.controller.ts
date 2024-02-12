import { IGameElement } from 'src/elements/elements.model';
import { GameService } from './game.service';
import { Controller, Get, Delete, Param } from '@nestjs/common';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get('/getGameElements/:gameid')
  getGameElements(@Param('gameid') gameid: string): IGameElement[] {
    return this.gameService.allGameElements(gameid);
  }
  @Get('/status/:gameid')
  getStatus(@Param('gameid') gameid: string): string {
    return this.gameService.getStatus(gameid);
  }
  @Delete(':gameid/delete')
  deleteAllElements(@Param('gameid') gameid: string): void {
    this.gameService.deleteElements(gameid);
  }
}
