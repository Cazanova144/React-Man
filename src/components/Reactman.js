import pac0 from '../assets/images/pac0.png'
import pac1 from '../assets/images/pac1.png'
import pac2 from '../assets/images/pac2.png'
import MovingDirection from './MovingDirection.js';

export default class Reactman {
  constructor(x, y, tileSize, velocity, tileMap) {
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

    document.addEventListener("keydown", this.#keydown)
  }

  draw (ctx) {
    this.#move()
    this.#animate()

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
    }

    // up
    if (e.keyCode == 38) {
      if (this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
    }

    // right
    if (e.keyCode == 39) {
      if (this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
    }

    // down
    if (e.keyCode == 40) {
      if (this.currentMovingDirection == MovingDirection.up)
        this.currentMovingDirection = MovingDirection.down;
      this.requestedMovingDirection = MovingDirection.down;
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
}