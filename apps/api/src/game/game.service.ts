/* eslint-disable prefer-const */
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
  private GamesData: GameState[];

  constructor() {
    this.GamesData = [];
  }
  private findGameById(gameid: string): GameState | undefined {
    return this.GamesData.find((game) => game.gameid === gameid);
  }

  allGameElements(gameid: string): IGameElement[] {
    const gameState = this.findGameById(gameid);

    if (gameState) {
      return gameState.allElements();
    } else {
      return [];
    }
  }

  gameInit(gameid: string, screenWidth: number, screenHeight: number): void {
    const gameState = new GameState(gameid);
    this.GamesData.push(gameState);
    this.createElements(gameid, screenWidth, screenHeight);
  }

  createElements(
    gameid: string,
    screenWidth: number,
    screenHeight: number,
  ): void {
    const gameState: GameState | undefined = this.findGameById(gameid);
    if (!gameState) {
      // Handle case where gameid does not exist
      return;
    }
    let index = 0;
    for (let i = 0; i < 3; i++) {
      const newGameElement = new CollectElement(
        index,
        screenWidth,
        screenHeight,
      );
      gameState.createGameElement(newGameElement);
      index++;
    }
    for (let i = 0; i < 3; i++) {
      const newGameElement = new AvoidElement(index, screenWidth, screenHeight);
      gameState.createGameElement(newGameElement);
      index++;
    }
    for (let i = 0; i < 3; i++) {
      const newGameElement = new ChangeElement(
        index,
        screenWidth,
        screenHeight,
      );
      index++;
      gameState.createGameElement(newGameElement);
      gameState.changeStatus('Continue');
      gameState.shuffleElements();
    }
  }

  onClick(gameid: string, index: number): void {
    const gameState = this.findGameById(gameid);
    if (!gameState) {
      // Handle case where gameid does not exist
      return;
    }

    const Element: IGameElement = gameState.getGameElement(index);
    const clickResponse: string = Element.onClicked();
    if (clickResponse === 'over') gameState.changeStatus('Over');
    const needClickElements = gameState
      .allElements()
      .filter((x) => x.kind === 'change' || x.kind === 'collect');

    const correctClicks = needClickElements.filter((x) => x.isclicked);
    if (
      needClickElements.length === correctClicks.length &&
      gameState.getStatus() === 'Continue'
    ) {
      gameState.changeStatus('Finished');
    }
  }

  getStatus(gameid: string): string {
    const gameState = this.findGameById(gameid);
    if (gameState) {
      this.mapGames();
      return gameState.getStatus();
    } else {
      return '';
    }
  }

  ElementChange(gameid: string, index: number): void {
    const gameState = this.findGameById(gameid);
    if (!gameState) {
      // Handle case where gameid does not exist
      return;
    }
    const gameElement = gameState.getGameElement(index) as ChangeElement;
    gameElement.change();
  }

  deleteElements(gameid: string): void {
    const index = this.GamesData.findIndex((game) => game.gameid === gameid);
    if (index !== -1) {
      this.GamesData.splice(index, 1);
    }
  }

  mapGames(): void {
    this.GamesData.map((x) => console.log(x));
    console.log(this.GamesData.length);
  }
}
