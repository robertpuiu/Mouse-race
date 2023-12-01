import { IGameElement } from './../elements/elements.model';
export class GameState {
  private GameElements: IGameElement[];
  private status: string;
  constructor() {
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
}
