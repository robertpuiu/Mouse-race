export interface IGameElement {
  kind: string;
  index: number;
  verticalPosition: number;
  width: number;
  color: string;
  shape: string;
  isclicked: boolean;
  onClicked(): string;
}

export class CollectElement implements IGameElement {
  kind: string;
  index: number;
  verticalPosition: number;
  width: number;
  color: string;
  shape: string;
  isclicked: boolean;

  constructor(index: number, screenWidth: number, screenHeight: number) {
    this.index = index;
    this.shape = 'rectangle';
    this.color = 'green';
    this.kind = 'collect';
    this.isclicked = false;
    this.width = screenWidth / 10;
    this.verticalPosition = screenHeight - screenHeight + Math.random();
  }

  onClicked(): string {
    this.isclicked = true;
    this.color = 'none';
    return 'continue';
  }
}

export class AvoidElement implements IGameElement {
  kind: string;
  index: number;
  verticalPosition: number;
  width: number;
  color: string;
  shape: string;
  isclicked: boolean;

  constructor(index: number, screenWidth: number, screenHeight: number) {
    this.index = index;
    this.shape = 'square';
    this.color = 'red';
    this.kind = 'avoid';
    this.isclicked = false;
    this.width = screenWidth / 10;
    this.verticalPosition = screenHeight - screenHeight + Math.random();
  }

  onClicked(): string {
    this.isclicked = true;
    return 'over';
  }
}
export class ChangeElement implements IGameElement {
  kind: string;
  index: number;
  verticalPosition: number;
  width: number;
  color: string;
  shape: string;
  isclicked: boolean;

  constructor(index: number, screenWidth: number, screenHeight: number) {
    this.index = index;
    this.shape = 'circle';
    this.color = 'green';
    this.kind = 'change';
    this.isclicked = false;
    this.width = screenWidth / 10;
    this.verticalPosition = screenHeight - screenHeight + Math.random();
  }

  onClicked(): string {
    this.isclicked = true;
    if (this.color === 'green') {
      this.color = 'none';
      return 'continue';
    } else return 'over';
  }
  change(): void {
    if (this.color === 'green') this.color = 'red';
    else this.color = 'green';
  }
}
