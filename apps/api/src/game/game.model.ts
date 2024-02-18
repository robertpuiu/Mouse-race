/* eslint-disable prefer-const */
import { IGameElement } from './../elements/elements.model';
export class GameState {
  private GameElements: IGameElement[];
  private status: string;
  public gameid: string;
  constructor(gameid: string) {
    this.gameid = gameid;
    this.status = 'Continue';
    this.GameElements = [];
  }
  public getGameElement(index: number): IGameElement {
    const gameElement = this.GameElements.find((x) => x.index === index);
    return gameElement;
  }
  public allElements(): IGameElement[] {
    return this.GameElements.map((element) => ({ ...element }));
  }
  public getStatus(): string {
    return this.status;
  }
  public changeStatus(status: string): void {
    this.status = status;
  }
  public createGameElement(gameElement: IGameElement): void {
    this.GameElements.push(gameElement);
  }
  public deleteAllElements(): void {
    this.GameElements = [];
  }
  public shuffleElements(): void {
    let allElements = this.GameElements;
    for (let i = allElements.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [allElements[i], allElements[j]] = [allElements[j], allElements[i]];
    }
  }
}
