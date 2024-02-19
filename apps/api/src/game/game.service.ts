/* eslint-disable prefer-const */
import {
  IGameShape,
  CollectShape,
  AvoidShape,
  ChangeShape,
} from './../shapes/shapes.model';
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

  allGameShapes(gameid: string): IGameShape[] {
    const gameState = this.findGameById(gameid);

    if (gameState) {
      return gameState.allShapes();
    } else {
      return [];
    }
  }

  gameInit(gameid: string, screenWidth: number, screenHeight: number): void {
    const gameState = new GameState(gameid);
    this.GamesData.push(gameState);
    this.createShapes(gameid, screenWidth, screenHeight);
  }

  createShapes(
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
      const newGameShape = new CollectShape(index, screenWidth, screenHeight);
      gameState.createGameShape(newGameShape);
      index++;
    }
    for (let i = 0; i < 3; i++) {
      const newGameShape = new AvoidShape(index, screenWidth, screenHeight);
      gameState.createGameShape(newGameShape);
      index++;
    }
    for (let i = 0; i < 3; i++) {
      const newGameShape = new ChangeShape(index, screenWidth, screenHeight);
      index++;
      gameState.createGameShape(newGameShape);
      gameState.changeStatus('Continue');
      gameState.shuffleShapes();
    }
  }

  onClick(gameid: string, index: number): void {
    const gameState = this.findGameById(gameid);
    if (!gameState) {
      // Handle case where gameid does not exist
      return;
    }

    const Shape: IGameShape = gameState.getGameShape(index);
    const clickResponse: string = Shape.onClicked();
    if (clickResponse === 'over') gameState.changeStatus('Over');
    const needClickShapes = gameState
      .allShapes()
      .filter((x) => x.kind === 'change' || x.kind === 'collect');

    const correctClicks = needClickShapes.filter((x) => x.isclicked);
    if (
      needClickShapes.length === correctClicks.length &&
      gameState.getStatus() === 'Continue'
    ) {
      gameState.changeStatus('Finished');
    }
  }

  getStatus(gameid: string): string {
    const gameState = this.findGameById(gameid);
    if (gameState) {
      //this.mapGames();
      return gameState.getStatus();
    } else {
      return '';
    }
  }

  ShapeChange(gameid: string, index: number): void {
    const gameState = this.findGameById(gameid);
    if (!gameState) {
      // Handle case where gameid does not exist
      return;
    }
    const gameShape = gameState.getGameShape(index) as ChangeShape;
    gameShape.change();
  }

  deleteShapes(gameid: string): void {
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
