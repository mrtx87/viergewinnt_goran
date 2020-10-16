import {Component} from '@angular/core';
import {Tile} from "./tile.model";
import {Player} from "./player.model";

const ROWS: number = 6;
const COLS: number = 7;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vier-gewinnt';
  gameBoard: Tile[];
  playerOne: Player;
  playerTwo: Player;
  currentPlayerId: number;
  gameFinished: boolean;

  constructor() {
    this.restartGame();
  }

  generateBoard(): Tile[] {
    const board: Tile[] = [];
    for (let i = 0; i < (ROWS * COLS); i++) {
      board.push(new Tile(i));
    }
    return board;
  }

  generatePlayer(name: string, id: number, color: "red" | "yellow"): Player {
    return new Player(name, id, color);
  }

  placeStone(tile: Tile) {
    if (this.isStonePlacable(tile) && !this.gameFinished) {
      this.updateTile(tile);
      //todo prüfen ob gewonnen
      this.togglePlayer();
      if(this.hasWon(tile)){
        //alert("GEWONNEN OGLUM");
        this.gameFinished = true;
      }
    }
  }

  getCurrentPlayer(): Player {
    return this.currentPlayerId === 1 ? this.playerOne : this.playerTwo;
  }

  isStonePlacable(placedTile: Tile): boolean {
    if (placedTile.value === "none") {
      if (placedTile.y === 5) {
        return true;
      }
      const tileUnderneath = this.gameBoard.find(tile => tile.x === placedTile.x && tile.y === placedTile.y + 1);
      return tileUnderneath.value !== "none";
    }
    return false;
  }

  private updateTile(tile: Tile) {
    let color = this.getCurrentPlayer().color;
    tile.value = color;
  }

  private togglePlayer() {
    if (this.currentPlayerId === 1) {
      this.currentPlayerId = 2;
    } else {
      this.currentPlayerId = 1;
    }
  }

  hasWon(placedTile: Tile) : boolean {
   return this.searchX(placedTile) || this.searchY(placedTile) || this.searchLeftBottom(placedTile) || this.searchRightBottom(placedTile);
  }

  searchX(placedTile: Tile) : boolean {

    const rowTiles = this.gameBoard.filter( tile => tile.y === placedTile.y);
    console.log(rowTiles);
   return  this.hasFourConnectedStones(rowTiles, placedTile.value);
  }

  searchY(placedTile: Tile) {
    const colTiles = this.gameBoard.filter( tile => tile.x === placedTile.x);
    console.log(colTiles);
    return  this.hasFourConnectedStones(colTiles, placedTile.value);
  }

  searchLeftBottom(placedTile: Tile) {
    const colTiles = this.gameBoard.filter( tile => (tile.x - placedTile.x) === (tile.y - placedTile.y));
    console.log(colTiles);
    return  this.hasFourConnectedStones(colTiles, placedTile.value);
  }

  searchRightBottom(placedTile: Tile) {
    const colTiles = this.gameBoard.filter( tile => (tile.x + tile.y) === (placedTile.x + placedTile.y));
    console.log(colTiles);
    return  this.hasFourConnectedStones(colTiles, placedTile.value);
  }

  hasFourConnectedStones(tiles : Tile[], color : 'yellow' | 'red' | 'none') : boolean {
    if(color === 'none'){
      return false;
    }
    let foundConnectedTilesCount = 0;
    for(let tile of tiles){
      if(tile.value === color){
        foundConnectedTilesCount += 1;
        if(foundConnectedTilesCount === 4) {
          return true;
        }
      } else {
        foundConnectedTilesCount = 0;
      }
    }
    return false;
  }

  restartGame() {
    this.gameBoard = this.generateBoard();
    this.playerOne = this.generatePlayer('Player1', 1, 'red');
    this.playerTwo = this.generatePlayer('Player2', 2, 'yellow');
    this.currentPlayerId = 1;
    this.gameFinished = false;
  }

}
