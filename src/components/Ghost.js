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

        // 832 32 KOORDINATER TILL BLINKYS (RÖD) SCATTER POSITION

        // console.log(this.tileMap.layout)

        // set to true for start of the game
        this.scatterMode = true

        // I will use this variable later to make a difference between the ghosts
        this.index = index


        this.#loadImages()

        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length)

        this.directionTimerDefault = 10
        this.directionTimer = this.directionTimerDefault

        this.scaredAboutToExpireTimerDefault = 10
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault

        // this.eaten = false
    }

    draw(ctx, pause, reactman) {
        if (!pause) {
            this.#move()
            this.#changeDirection()

            // if (this.index == 0) {
            //     console.log("this.x ==>", this.x)
            //     console.log("this.starterX ==>", this.starterX)

            // }
            // console.log("this.tileMap.layout ==>", this.tileMap.layout)
        }

        // console.log("reactman ==>", reactman.x)

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

    // && !this.eaten

    #setImage(ctx, reactman) {
        if (reactman.powerPelletActive) {
            this.#setImageWhenPowerPelletIsActive(reactman)
        } else {

            if (this.index == 0) this.image = this.pinky
            if (this.index == 1) this.image = this.blinky
            if (this.index == 2) this.image = this.clyde
            if (this.index == 3) this.image = this.inky

            // this.eaten = false
            
            // this.image = this.normalGhost
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

    #findPath(currentX, currentY, finalX, finalY) {
        let pathArray = []

        while (currentX != finalX && currentY != finalY) {

        }
    }

    #isXCoordsCloser(currentX, newX, finalX) {
        if ((newX - finalX) > (currentX - finalX)) {
            return true
        } else return false
    }

    #isYCoordsCloser(currentY, newY, finalY) {
        if ((newY - finalY) > (currentY - finalY)) {
            return true
        } else return false
    }

    // if (this.index === 1) {
    // if (this.#isYCoordsCloser(this.y, this.y += this.velocity, 32)) {
    //     console.log("going up")
    //     console.log("this.x, this.y ==>", this.x, this.y)
        
    //     newMoveDirection = MovingDirection.up
    // } else if (this.#isYCoordsCloser(this.y, this.y -= this.velocity, 32)) {
    //     console.log("going down")
    //     console.log("this.x, this.y ==>", this.x, this.y)
        
    //     newMoveDirection = MovingDirection.down
    // } else if (this.#isXCoordsCloser(this.x, this.x += this.velocity, 32)) {
    //     console.log("going left")
    //     console.log("this.x, this.y ==>", this.x, this.y)
        
    //     newMoveDirection = MovingDirection.left
    // } else if (this.#isXCoordsCloser(this.x, this.x -= this.velocity, 32)) {
    //     console.log("going right")
    //     console.log("this.x, this.y ==>", this.x, this.y)
        
    //     newMoveDirection = MovingDirection.right
    // }
    // }

    #changeDirection() {
        this.directionTimer--;
        let newMoveDirection = null

        // console.log("this.directionTimer ==>", this.directionTimer)
        
        if (this.directionTimer == 0) {
            this.directionTimer = this.directionTimerDefault
            
            newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length)


        }
        
        // if (this.index == 1) {

        // }

        if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
            if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
                if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, newMoveDirection)) {
                    this.movingDirection = newMoveDirection
                    // console.log("this.x ==>", this.x, this.index)
                    // console.log("this.y ==>", this.y, this.index)
                    // console.log("this.movingDirection ==>", this.movingDirection)

                }
            }
        }
    }

    #move() {
        // console.log(this.reactmanX)
        // console.log("this.velocity ==>", this.velocity)

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

        // if statements for making Ghosts able to go out one side and in the other

        if (!this.x && this.movingDirection == MovingDirection.left) {
            this.x = 900
        }
    
        if (this.x == 900 && this.movingDirection == MovingDirection.right) {
            this.x = 0
        }
    }

    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
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

        // this.image = this.normalGhost

        if (this.index == 0) this.image = this.pinky
        if (this.index == 1) this.image = this.blinky
        if (this.index == 2) this.image = this.clyde
        if (this.index == 3) this.image = this.inky
    }
}