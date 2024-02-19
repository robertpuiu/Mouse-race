import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { GameService } from 'src/game/game.service';

@Controller('')
export class ShapesController {
  constructor(private readonly gameService: GameService) {}

  @Post('click/:gameid/:index')
  handleShapeClick(
    @Param('gameid') gameid: string,
    @Param('index', ParseIntPipe) index: number,
  ): void {
    this.gameService.onClick(gameid, index);
  }
  @Post('change/:gameid/:index')
  handleShapeChange(
    @Param('gameid') gameid: string,
    @Param('index', ParseIntPipe) index: number,
  ): void {
    this.gameService.ShapeChange(gameid, index);
  }
}
