export class Player {

  name : string;
  id : number;
  color : 'red' | 'yellow';


  constructor(name: string, id: number, color: 'red' | 'yellow') {
    this.name = name;
    this.id = id;
    this.color = color;
  }
}
