/* eslint-disable prefer-const */
import { IGameShape } from './../shapes/shapes.model';
export class GameState {
  private GameShapes: IGameShape[];
  private status: string;
  public gameid: string;
  constructor(gameid: string) {
    this.gameid = gameid;
    this.status = 'Continue';
    this.GameShapes = [];
  }
  public getGameShape(index: number): IGameShape {
    const gameShape = this.GameShapes.find((x) => x.index === index);
    return gameShape;
  }
  public allShapes(): IGameShape[] {
    return this.GameShapes.map((shape) => ({ ...shape }));
  }
  public getStatus(): string {
    return this.status;
  }
  public changeStatus(status: string): void {
    this.status = status;
  }
  public createGameShape(gameShape: IGameShape): void {
    this.GameShapes.push(gameShape);
  }
  public deleteAllShapes(): void {
    this.GameShapes = [];
  }
  public shuffleShapes(): void {
    let allShapes = this.GameShapes;
    for (let i = allShapes.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [allShapes[i], allShapes[j]] = [allShapes[j], allShapes[i]];
    }
  }
}
