import ghost from '../assets/images/ghost.png'
import scaredGhost from '../assets/images/scaredGhost.png'
import scaredGhost2 from '../assets/images/scaredGhost2.png'

export default class Ghost {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x
        this.y = y
        this.tileSize = tileSize
        this.velocity = velocity
        this.tileMap = tileMap

        this.#loadImages()
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
    }

    #loadImages() {
        this.normalGhost = new Image();
        this.normalGhost.src = ghost
        
        this.scaredGhost = new Image()
        this.scaredGhost.src = scaredGhost

        this.scaredGhost2 = new Image()
        this.scaredGhost2.src = scaredGhost2

        this.image = this.normalGhost
    }
}