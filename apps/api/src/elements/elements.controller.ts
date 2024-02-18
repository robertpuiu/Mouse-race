import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { GameService } from 'src/game/game.service';

@Controller('')
export class ElementsController {
  constructor(private readonly gameService: GameService) {}

  @Post('click/:gameid/:index')
  handleElementClick(
    @Param('gameid') gameid: string,
    @Param('index', ParseIntPipe) index: number,
  ): void {
    this.gameService.onClick(gameid, index);
  }
  @Post('change/:gameid/:index')
  handleElementChange(
    @Param('gameid') gameid: string,
    @Param('index', ParseIntPipe) index: number,
  ): void {
    this.gameService.ElementChange(gameid, index);
  }
}
