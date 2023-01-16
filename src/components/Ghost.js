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

        this.scaredAboutToExpireTimerDefault = 10
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault
    }

    draw(ctx, pause, reactman) {
        if (!pause) {
            this.#move()
            this.#changeDirection()
        }

        this.#setImage(ctx, reactman)
    }

    collideWith(reactman) {
        const size = this.tileSize / 2

        if (this.x < reactman.x + size && this.x + size > reactman.x && this.y < reactman.y + size && this.y + size > reactman.y) {
            return true
        } else {
            return false
        }
    }

    #setImage(ctx, reactman) {
        if (reactman.powerPelletActive) {
            this.#setImageWhenPowerPelletIsActive(reactman)
        } else {
            this.image = this.normalGhost
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