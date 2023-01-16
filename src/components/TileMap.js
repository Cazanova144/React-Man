import Reactman from './Reactman'
import Ghost from './Ghost'
import MovingDirection from './MovingDirection.js';
import pellet from '../assets/images/yellowDot.png'
import powerPellet from '../assets/images/pinkDot.png'
import wall from '../assets/images/wall.png'

export default class TileMap {
    constructor (tileSize) {
        this.tileSize = tileSize;

        this.pellet = new Image()
        this.pellet.src = pellet

        this.powerPellet = new Image()
        this.powerPellet.src = powerPellet

        // this.pellet = this.powerPellet

        this.wall = new Image()
        this.wall.src = wall

        this.powerDot = this.powerPellet
        this.powerPelletAnimationTimerDefault = 30
        this.powerPelletAnimationTimer = this.powerPelletAnimationTimerDefault
    }

    //0 - pellets
    //1 - wall
    //4 - pacman
    //5 - empty space
    //6 - ghost
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
        [1,1,1,1,1,1,0,1,1,5,1,1,1,5,5,1,1,1,5,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,5,1,6,5,5,5,5,6,1,5,1,1,0,1,1,1,1,1,1],
        [5,5,5,5,5,5,0,0,0,5,1,5,5,5,5,5,5,1,5,0,0,0,5,5,5,5,5,5],
        [1,1,1,1,1,1,0,1,1,5,1,6,5,5,5,5,6,1,5,1,1,0,1,1,1,1,1,1],
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

                // draw power-pellet
                if (tile === 7) {
                    this.#drawPowerPellet(ctx, column, row, this.tileSize)
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

    #drawPowerPellet(ctx, column, row, size) {
        this.powerPelletAnimationTimer--
        // console.log("this.powerPelletAnimationTimer ==>", this.powerPelletAnimationTimer)

        if (this.powerPelletAnimationTimer === 0) {
            this.powerPelletAnimationTimer = this.powerPelletAnimationTimerDefault

            if (this.powerDot == this.powerPellet) {
                // console.log("powerDot ==>", this.powerDot)
                this.powerDot = this.pellet
                // console.log("this.powerDot ==>", this.powerDot)
            } else {
                // console.log("powerDot ==>", this.powerDot)
                this.powerDot = this.powerPellet
            }
        }

        // console.log("this.powerDot ==>", this.powerDot)
        
        ctx.drawImage(this.powerDot, column * size, row * size, size, size)
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

    getGhosts(velocity) {
        const ghosts = []
        let index = 0

        for (let row = 0; row < this.layout.length; row++) {
            for (let column = 0; column < this.layout[row].length; column++) {
                const tile = this.layout[row][column]

                if (tile == 6) {
                    this.layout[row][column] = 0
                    
                    ghosts.push(new Ghost(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this, index))
                    index++
                }
            }
        }

        return ghosts
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

    didWin() {
        return this.#pelletsLeft === 0
    }

    #pelletsLeft() {
        return this.layout.flat().filter(tile => tile === 0).length
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

    eatPowerPellet(x, y) {
        const row = y / this.tileSize
        const column = x / this.tileSize

        if (Number.isInteger(row) && Number.isInteger(column)) {
            const tile = this.layout[row][column]

            if (tile == 7) {
                this.layout[row][column] = 5
                return true
            }
        }
        return false
    }
}