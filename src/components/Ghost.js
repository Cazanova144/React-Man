import MovingDirection from './MovingDirection'
import ghost from '../assets/images/ghost.png'
import scaredGhost from '../assets/images/scaredGhost.png'
import scaredGhost2 from '../assets/images/scaredGhost2.png'

export default class Ghost {
    constructor(x, y, tileSize, velocity, tileMap, index) {
        this.x = x
        this.y = y
        this.tileSize = tileSize
        this.velocity = velocity
        this.tileMap = tileMap

        // I will use this variable later to make a difference between the ghosts
        this.index = index

        // console.log("index ==>", index)

        this.#loadImages()

        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length)

        this.directionTimerDefault = this.#random(10, 50)
        this.directionTimer = this.directionTimerDefault
    }

    draw(ctx) {
        this.#move()
        this.#changeDirection()

        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
    }

    #changeDirection() {
        this.directionTimer--;
        let newMoveDirection = null

        if (this.directionTimer == 0) {
            this.directionTimer = this.directionTimerDefault

            newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length)
        }

        if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
            if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
                if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, newMoveDirection)) {
                    this.movingDirection = newMoveDirection
                }
            }
        }
    }

    #move() {
        if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.movingDirection)) {
            switch(this.movingDirection) {
                case MovingDirection.up:
                    this.y -= this.velocity;
                    break;
                case MovingDirection.down:
                    this.y += this.velocity;
                    break;
                case MovingDirection.left:
                    this.x -= this.velocity;
                    break;
                case MovingDirection.right:
                    this.x += this.velocity;
                    break;
            }
        }
    }

    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    #loadImages() {
        // Use index here to switch between images

        this.normalGhost = new Image();
        this.normalGhost.src = ghost
        
        this.scaredGhost = new Image()
        this.scaredGhost.src = scaredGhost

        this.scaredGhost2 = new Image()
        this.scaredGhost2.src = scaredGhost2

        this.image = this.normalGhost
    }
}