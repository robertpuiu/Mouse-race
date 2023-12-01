import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { GameService } from 'src/game/game.service';

@Controller('')
export class ElementsController {
  constructor(private readonly gameService: GameService) {}

  @Post('click/:index')
  handleElementClick(@Param('index', ParseIntPipe) index: number): void {
    this.gameService.onClick(index);
  }
  @Post('change/:index')
  handleElementChange(@Param('index', ParseIntPipe) index: number): void {
    this.gameService.ElementChange(index);
  }
}
