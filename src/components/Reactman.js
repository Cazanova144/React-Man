class Reactman {
    constructor(x, y, startIndex, speed) {
      this.x = x;
      this.y = y;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex; 

      this.currentDirection = null;
      this.requestedDirection = null;

      document.addEventListener("keydown", this.#keydown)
    }

    #keydown = (e) => {
      // left
      if (e.keyCode == 37) {
        if (this.currentDirection == MovingDirection.right)
          this.currentDirection == MovingDirection.left;
        this.requestedDirection == MovingDirection.left;
      }

      // up
      if (e.keyCode == 38) {
        console.log("AAA")
        if (this.currentDirection == MovingDirection.down)
          this.currentDirection == MovingDirection.up;
        this.requestedDirection == MovingDirection.up;
      }

      // right
      if (e.keyCode == 39) {
        if (this.currentDirection == MovingDirection.left)
          this.currentDirection == MovingDirection.right;
        this.requestedDirection == MovingDirection.right;
      }

      // down
      if (e.keyCode == 40) {
        if (this.currentDirection == MovingDirection.up)
          this.currentDirection == MovingDirection.down;
        this.requestedDirection == MovingDirection.down;
      }
    }

    #move() {
      if (this.currentDirection !== this.requestedDirection) {
        if (Number.isInteger(this.x/20) && Number.isInteger(this.y/20)) {
          this.currentDirection = this.requestedDirection
        }
      }

      switch(this.currentDirection) {
        case MovingDirection.up:
          this.y -= this.speed;
          break; 
        case MovingDirection.down:
          this.y += this.speed;
          break;
      }
    }
}