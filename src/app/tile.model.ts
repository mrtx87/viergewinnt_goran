export class Tile {

  index : number;
  x : number;
  y : number;

  value : 'red' | 'yellow' | 'none' = 'none';

  constructor(index : number) {
      this.index = index;
      //6,7

    let x = index % 7;
    let y = (index - x) / 7;
    console.log(`x: ${x} y: ${y}`);
    this.x = x;
    this.y = y;
  }


}
