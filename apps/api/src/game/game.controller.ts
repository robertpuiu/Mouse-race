import { IGameElement } from 'src/elements/elements.model';
import { GameService } from './game.service';
import { Controller, Get, Delete } from '@nestjs/common';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get('/getGameElements')
  getGameElements(): IGameElement[] {
    return this.gameService.allGameElements();
  }
  @Get('/status')
  getStatus(): string {
    return this.gameService.getStatus();
  }
  @Delete('/delete')
  deleteAllElements(): void {
    this.gameService.deleteElements();
  }
}
