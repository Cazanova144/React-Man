import pac0 from '../assets/images/pac0.png'
import pac1 from '../assets/images/pac1.png'
import pac2 from '../assets/images/pac2.png'
import MovingDirection from './MovingDirection.js';

export default class Reactman {
    constructor(x, y, tileSize, velocity, tileMap) {
      this.x = x;
      this.y = y;
      this.tileSize = tileSize;
      this.velocity = velocity;
      this.tileMap = tileMap; 

      this.currentMovingDirection = null;
      this.requestedMovingDirection = null;
      
      this.#loadReactmanImages();

      document.addEventListener("keydown", this.#keydown)
    }

    draw (ctx) {
      this.#move()

      ctx.drawImage(this.reactmanImages[this.reactmanImageIndex], this.x, this.y, this.tileSize, this.tileSize)
    }

    #loadReactmanImages() {
      const reactmanImage1 = new Image();
      reactmanImage1.src = pac0

      const reactmanImage2 = new Image();
      reactmanImage2.src = pac1

      const reactmanImage3 = new Image();
      reactmanImage3.src = pac2

      const reactmanImage4 = new Image();
      reactmanImage3.src = pac1

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
        return
      }

      switch (this.currentMovingDirection) {
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