import MovingDirection from './MovingDirection'
import ghost from '../assets/images/ghost.png'
import blinky from '../assets/images/blinky.png'
import inky from '../assets/images/inky.png'
import pinky from '../assets/images/pinky.png'
import clyde from '../assets/images/clyde.png'
import scaredGhost from '../assets/images/scaredGhost.png'
import scaredGhost2 from '../assets/images/scaredGhost2.png'

export default class Ghost {
    constructor(x, y, tileSize, velocity, tileMap, index) {
        this.starterX = x
        this.starterY = y
        this.x = x
        this.y = y
        this.tileSize = tileSize
        this.velocity = velocity
        this.tileMap = tileMap

        // I will use this variable later to make a difference between the ghosts
        this.index = index

        this.#loadImages()

        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length)

        this.directionTimerDefault = 10

        // Failed at pathfinder algorythms, so changed the timer when some ghosts decide to make a new move
        if (this.index == 1) {
            this.directionTimerDefault = 8
        } else if (this.index == 2) {
            this.directionTimerDefault = 15
        }

        this.directionTimer = this.directionTimerDefault

        this.scaredAboutToExpireTimerDefault = 10
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault
    }

    draw(ctx, pause, reactman) {
        if (!pause) {
            this.#move()
            this.#changeDirection()
        }

        this.reactmanX = reactman.x
        this.reactmanY = reactman.y

        this.#setImage(ctx, reactman)
    }

    collideWith(reactman) {
        const size = this.tileSize / 2

        if (this.x < reactman.x + size && this.x + size > reactman.x && this.y < reactman.y + size && this.y + size > reactman.y) {

            reactman.lifes = reactman.lifes - 1

            return true
        } else {
            return false
        }
    }

    #setImage(ctx, reactman) {
        if (reactman.powerPelletActive) {
            this.#setImageWhenPowerPelletIsActive(reactman)
        } else {
            // Here I give the ghosts different looks

            if (this.index == 0) this.image = this.pinky
            if (this.index == 1) this.image = this.blinky
            if (this.index == 2) this.image = this.clyde
            if (this.index == 3) this.image = this.inky
        }

        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
    }

    #setImageWhenPowerPelletIsActive(reactman) {

        if (reactman.powerPelletAboutToExpire) {
            this.scaredAboutToExpireTimer--

            if (this.scaredAboutToExpireTimer == 0) {
                this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault

                if (this.image == this.scaredGhost) {
                    this.image = this.scaredGhost2
                } else {
                    this.image = this.scaredGhost
                }
            }
        } else {
            this.image = this.scaredGhost
        }
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
        if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.movingDirection) && !this.tileMap.ghostCollideWithGhostDoor(this.x, this.y, this.movingDirection)) {
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

        // if statements for making Ghosts able to go out one side and in the other

        if (!this.x && this.movingDirection == MovingDirection.left) {
            this.x = 900
        }
    
        if (this.x == 900 && this.movingDirection == MovingDirection.right) {
            this.x = 0
        }
    }

    #loadImages() {
        // Use index here to switch between images
        this.blinky = new Image()
        this.blinky.src = blinky

        this.inky = new Image()
        this.inky.src = inky

        this.pinky = new Image()
        this.pinky.src = pinky

        this.clyde = new Image()
        this.clyde.src = clyde

        this.normalGhost = new Image();
        this.normalGhost.src = ghost
        
        this.scaredGhost = new Image()
        this.scaredGhost.src = scaredGhost

        this.scaredGhost2 = new Image()
        this.scaredGhost2.src = scaredGhost2

        if (this.index == 0) this.image = this.pinky
        if (this.index == 1) this.image = this.blinky
        if (this.index == 2) this.image = this.clyde
        if (this.index == 3) this.image = this.inky
    }
}