import {
  IGameElement,
  CollectElement,
  AvoidElement,
  ChangeElement,
} from './../elements/elements.model';
import { Injectable } from '@nestjs/common';
import { GameState } from './game.model';

@Injectable()
export class GameService {
  private GameData: GameState;

  constructor() {
    this.GameData = new GameState(); // Initialize GameState
  }
  allGameElements(): IGameElement[] {
    return this.GameData.allElements();
  }
  createElements(screenWidth: number, screenHeight) {
    for (let i = 0; i < 3; i++) {
      const newGameElement = new CollectElement(
        this.GameData.allElements().length,
        screenWidth,
        screenHeight,
      );
      this.GameData.createGameElement(newGameElement);
    }
    for (let i = 0; i < 3; i++) {
      const newGameElement = new AvoidElement(
        this.GameData.allElements().length,
        screenWidth,
        screenHeight,
      );
      this.GameData.createGameElement(newGameElement);
    }
    for (let i = 0; i < 3; i++) {
      const newGameElement = new ChangeElement(
        this.GameData.allElements().length,
        screenWidth,
        screenHeight,
      );
      this.GameData.createGameElement(newGameElement);
    }
  }
  onClick(index: number) {
    const Element: IGameElement = this.GameData.getGameElement(index);
    const clickResponse: string = Element.onClicked();
    console.log('resp', clickResponse);
    if (clickResponse === 'over') this.GameData.changeStatus('Over');
    const needClickElements = this.GameData.allElements().filter(
      (x) => x.kind === 'change' || x.kind === 'collect',
    );

    const correctClicks = needClickElements.filter((x) => x.isclicked);
    if (
      needClickElements.length === correctClicks.length &&
      this.GameData.getStatus() === 'Continue'
    ) {
      this.GameData.changeStatus('Finished');
    }
  }
  getStatus(): string {
    return this.GameData.getStatus();
  }
  ElementChange(index: number): void {
    const gameElement = this.GameData.getGameElement(index) as ChangeElement;
    gameElement.change();
  }
}
