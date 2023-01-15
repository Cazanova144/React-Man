import pellet from '../assets/images/yellowDot.png'
import wall from '../assets/images/wall.png'
import Reactman from './Reactman'
import MovingDirection from './MovingDirection.js';

export default class TileMap {
    constructor (tileSize) {
        this.tileSize = tileSize;

        this.pellet = new Image()
        this.pellet.src = pellet

        this.wall = new Image()
        this.wall.src = wall
    }

    //0 - pellets
    //1 - wall
    //4 - pacman
    //5 - empty space
    //6 - enemy
    //7 - power-pellet

    layout = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,7,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,7,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,5,5,5,5,5,5,5,5,5,5,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,5,1,1,1,2,2,1,1,1,5,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,5,1,2,2,2,2,2,2,1,5,1,1,0,1,1,1,1,1,1],
        [5,5,5,5,5,5,0,0,0,5,1,2,2,2,2,2,2,1,5,0,0,0,5,5,5,5,5,5],
        [1,1,1,1,1,1,0,1,1,5,1,2,2,2,2,2,2,1,5,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,5,1,1,1,1,1,1,1,1,5,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,5,1,1,1,1,1,1,1,1,5,1,1,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,5,5,5,5,5,4,5,5,5,5,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,7,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,7,1],
        [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
        [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
        [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ]

    draw (ctx) {
        for (let row = 0; row < this.layout.length; row++) {
            for (let column = 0; column < this.layout[row].length; column++) {
                let tile = this.layout[row][column];

                // draw pellet
                if (tile === 0) {
                    this.#drawPellet(ctx, column, row, this.tileSize)
                } else {
                    this.#drawBlank(ctx, column, row, this.tileSize)
                }

                // draw wall
                if (tile === 1) {
                    this.#drawWall(ctx, column, row, this.tileSize)
                } 
    

                // Uncomment to see border between tiles

                // ctx.strokeStyle = 'white';
                // ctx.strokeRect(column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize)
            }
        }

    }

    #drawPellet(ctx, column, row, size) {
        ctx.drawImage(this.pellet, column * this.tileSize, row * this.tileSize, size, size)
    }

    #drawWall(ctx, column, row, size) {
        ctx.drawImage(this.wall, column * this.tileSize, row * this.tileSize, size, size)
    }

    #drawBlank(ctx, column, row, size) {
        ctx.fillStyle = 'black'
        ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size)
    }

    getReactman(velocity) {
        for (let row = 0; row < this.layout.length; row++) {
            for (let column = 0; column < this.layout[row].length; column++) {
                let tile = this.layout[row][column];

                // if tile is react-man
                if (tile === 4) {
                    // this.layout[row][column] = 0;
                    return new Reactman(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this)
                }
            }
        }
    }

    setCanvasSize(canvas) {
        canvas.width = this.layout[0].length * this.tileSize;
        canvas.height = this.layout.length * this.tileSize;
    }

    didCollideWithEnvironment(x, y, direction) {
        if (direction == null) {
          return;
        }
    
        if (
          Number.isInteger(x / this.tileSize) &&
          Number.isInteger(y / this.tileSize)
        ) {
          let column = 0;
          let row = 0;
          let nextColumn = 0;
          let nextRow = 0;
    
          switch (direction) {
            case MovingDirection.right:
              nextColumn = x + this.tileSize;
              column = nextColumn / this.tileSize;
              row = y / this.tileSize;
              break;
            case MovingDirection.left:
              nextColumn = x - this.tileSize;
              column = nextColumn / this.tileSize;
              row = y / this.tileSize;
              break;
            case MovingDirection.up:
              nextRow = y - this.tileSize;
              row = nextRow / this.tileSize;
              column = x / this.tileSize;
              break;
            case MovingDirection.down:
              nextRow = y + this.tileSize;
              row = nextRow / this.tileSize;
              column = x / this.tileSize;
              break;
          }
          const tile = this.layout[row][column];
          if (tile === 1) {
            return true;
          }
        }
        return false;
    }

    eatPellet(x, y) {
        const row = y / this.tileSize
        const column = x / this.tileSize

        if (Number.isInteger(row) && Number.isInteger(column)) {
            if (this.layout[row][column] === 0) {
                this.layout[row][column] = 5
                return true
            }
        }
        return false
    }
}