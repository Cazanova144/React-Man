import MovingDirection from './MovingDirection.js';
import pac0 from '../assets/images/pac0.png'
import pac1 from '../assets/images/pac1.png'
import pac2 from '../assets/images/pac2.png'
import waka from '../assets/sounds/waka.wav'
import power_dot from '../assets/sounds/power_dot.wav'
import eat_ghost from '../assets/sounds/eat_ghost.wav'

export default class Reactman {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.starterX = x
    this.starterY = y
    this.x = x
    this.y = y
    this.tileSize = tileSize
    this.velocity = velocity
    this.tileMap = tileMap

    this.currentMovingDirection = null
    this.requestedMovingDirection = null

    this.reactmanAnimationTimerDefault = 10
    this.reactmanAnimationTimer = null
      
    this.#loadReactmanImages();

    this.reactmanRotation = this.Rotation.right

    this.powerPelletActive = false
    this.powerPelletAboutToExpire = false
    this.timers = []

    this.lifes = 3

    this.score = 0

    this.madeFirstMove = false

    document.addEventListener("keydown", this.#keydown)
  }

  draw (ctx, pause, ghosts) {
    if (!pause) {
      this.#move()
      this.#animate()

      // console.log("this.x, this,y ==>", this.x, this.y)
    }

    this.#eatPellet()
    this.#eatPowerPellet(ghosts)
    this.#eatGhost(ghosts)

    const size = this.tileSize / 2

    ctx.save()
    ctx.translate(this.x + size, this.y + size)
    ctx.rotate((this.reactmanRotation * 90 * Math.PI) / 180)
    ctx.drawImage(this.reactmanImages[this.reactmanImageIndex], -size, -size, this.tileSize, this.tileSize)

    ctx.restore();

    // ctx.drawImage(this.reactmanImages[this.reactmanImageIndex], this.x, this.y, this.tileSize, this.tileSize)
  }

  Rotation = {
    right: 0,
    down: 1,
    left: 2,
    up: 3
  }

  #loadReactmanImages() {
    const reactmanImage1 = new Image();
    reactmanImage1.src = pac0

    const reactmanImage2 = new Image();
    reactmanImage2.src = pac1

    const reactmanImage3 = new Image();
    reactmanImage3.src = pac2

    const reactmanImage4 = new Image();
    reactmanImage4.src = pac1

    this.reactmanImages = [reactmanImage1, reactmanImage2, reactmanImage3, reactmanImage4]

    this.reactmanImageIndex = 0
  }

  #keydown = (e) => {
    // left
    if (e.keyCode == 37) {
      if (this.currentMovingDirection == MovingDirection.right)
        this.currentMovingDirection = MovingDirection.left;
      this.requestedMovingDirection = MovingDirection.left;
      this.madeFirstMove = true
    }

    // up
    if (e.keyCode == 38) {
      if (this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
      this.madeFirstMove = true
    }

    // right
    if (e.keyCode == 39) {
      if (this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
      this.madeFirstMove = true
    }

    // down
    if (e.keyCode == 40) {
      if (this.currentMovingDirection == MovingDirection.up)
        this.currentMovingDirection = MovingDirection.down;
      this.requestedMovingDirection = MovingDirection.down;
      this.madeFirstMove = true
    }
  }

  #move () {    

    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
          if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.requestedMovingDirection))
        this.currentMovingDirection = this.requestedMovingDirection;
      }
    }

    if (this.tileMap.didCollideWithEnvironment(this.x, this.y, this.currentMovingDirection)) {
      this.reactmanAnimationTimer = null
      this.reactmanImageIndex = 0
      return
    } else if (this.currentMovingDirection != null && this.reactmanAnimationTimer === null) {
      this.reactmanAnimationTimer = this.reactmanAnimationTimerDefault
    }

    switch (this.currentMovingDirection) {
      case MovingDirection.up:
        this.y -= this.velocity;
        this.reactmanRotation = this.Rotation.up;
        break;
      case MovingDirection.down:
        this.reactmanRotation = this.Rotation.down;
        this.y += this.velocity;
        break;
      case MovingDirection.left:
        this.reactmanRotation = this.Rotation.left;
        this.x -= this.velocity;
        break;
      case MovingDirection.right:
        this.reactmanRotation = this.Rotation.right;
        this.x += this.velocity;
        break;
    }

    // if statements for making React-Man able to go out one side and in the other

    if (!this.x && this.currentMovingDirection == MovingDirection.left) {
      this.x = 900
    }

    if (this.x == 900 && this.currentMovingDirection == MovingDirection.right) {
      this.x = 0
    }
  }

  #animate () {
    if (this.reactmanAnimationTimer === null) return;

    this.reactmanAnimationTimer--

    if (this.reactmanAnimationTimer == 0) {
      this.reactmanAnimationTimer = this.reactmanAnimationTimerDefault
      this.reactmanImageIndex++

      if (this.reactmanImageIndex == this.reactmanImages.length) this.reactmanImageIndex = 0
    }
  }

  #eatPellet () {
    if (this.tileMap.eatPellet(this.x, this.y)) {

      // add score
      this.score += 10

      this.wakaSound = new Audio(waka)

      // play sound
      this.wakaSound.play()

      this.wakaSound.onended = function() {
        // this.currentSrc = null;
        this.src = "";
        this.srcObject = null;
        this.remove();
      }

    }
  }

  #eatPowerPellet(ghosts) {
    
    if (this.tileMap.eatPowerPellet(this.x, this.y)) {

      this.powerPelletSound = new Audio(power_dot)
      
      this.powerPelletSound.play()

      this.powerPelletSound.onended = function() {
        // this.currentSrc = null;
        this.src = "";
        this.srcObject = null;
        this.remove();
      }

      this.powerPelletActive = true
      this.powerPelletAboutToExpire = false
      this.timers.forEach((timer) => clearTimeout(timer))
      this.timers = []

      let powerPelletTimer = setTimeout(() => {
        this.powerPelletActive = false
        this.powerPelletAboutToExpire = false
      }, 6 * 1000)
      
      // .then(ghosts.map((ghost) => ghost.eaten = false))

      this.timers.push(powerPelletTimer)

      let powerPelletAboutToExpireTimer = setTimeout(() => {
        this.powerPelletAboutToExpire = true
      }, 3 * 1000)

      this.timers.push(powerPelletAboutToExpireTimer)

      // add score
      this.score += 50
    }
  }

  // && ghost.eaten == false

  #eatGhost(ghosts) {
    if (this.powerPelletActive) {
      // add score
      // this.score += 100

      // console.log("ghosts ==>", ghosts)

      const collideGhosts = ghosts.filter((ghost) => ghost.collideWith(this))

      collideGhosts.forEach((ghost) => {
        // ghosts.splice(ghosts.indexOf(ghost), 1)

        // ghost.eaten = true

        ghost.x = ghost.starterX
        ghost.y = ghost.starterY

        this.score += 100

        this.eatGhostSound = new Audio(eat_ghost)

        this.eatGhostSound.play()

        this.eatGhostSound.onended = function() {
          // this.currentSrc = null;
          this.src = "";
          this.srcObject = null;
          this.remove();
        }
      })
    }
  }
}