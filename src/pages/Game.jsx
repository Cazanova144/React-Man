import { React, useEffect, useState } from 'react'
import TileMap from '../components/TileMap'
import gameOverWav from '../assets/sounds/gameOver.wav'
import gameWinWav from '../assets/sounds/gameWin.wav'

const Game = () => {

  
  const tileSize = 32
  const velocity = 2

  
  const tileMap = new TileMap(tileSize)
  const reactman = tileMap.getReactman(velocity)
  const ghosts = tileMap.getGhosts(velocity)

  const [lost, setLost] = useState(false)
  const [won, setWon] = useState(false)
  const [score, setScore] = useState(0)
  const [lifes, setLifes] = useState(3)
  const [level, setLevel] = useState(1)

  let gamePaused = false

  let gameOver = false
  let gameWin = false

  



  // useEffect(() => {
  //   console.log("reactman lifes left ==>", reactman.lifes)
  // }, [reactman.lifes])

  useEffect(() => {
      // setWon(false)
      // setLost(false)

    // console.log("level ==>", level)

    gameWin = false
    gameOver = false
    // console.log("useEffect körs")

    document.body.style.overflow = "hidden"

    const canvas = document.getElementById('grid')
    const ctx = canvas.getContext('2d')

    // console.log("ctx ==>", ctx)

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // console.log(ctx.clearRect(0, 0, canvas.width, canvas.height))
    // console.log("tileMap.layout ==>", tileMap.layout)
    
    // console.log("canvas ==>", canvas)
    
    

    const gameLoop = () => {
      // console.log("gameloop", level)
      tileMap.draw(ctx);

      drawGameEnd()

      reactman.draw(ctx, pause(), ghosts)
      ghosts.forEach(ghost => ghost.draw(ctx, pause(), reactman))

      // console.log("reactman.score ==>", reactman.score)
      setScore(score + reactman.score)
      // setLifes(reactman.lifes)

      checkGameOver()
      checkGameWin()
    }
    
    tileMap.setCanvasSize(canvas)
    let interval = setInterval(gameLoop, 1000 / 75)

    const checkGameWin = () => {
      // console.log("gameWin ==>", gameWin)
      if (!gameWin) {
        gameWin = tileMap.didWin()

        // setWon(tileMap.didWin())

        // console.log("gameWin ==>", gameWin)
        // console.log("won ==>", won)

        if (gameWin) {

          const gameWinSound = new Audio(gameWinWav)

          // console.log("tileMap.layout ==>", tileMap.layout)

          gameWinSound.play()

          gameWinSound.onended = function() {
            // this.currentSrc = null;
            this.src = "";
            this.srcObject = null;
            this.remove();
          }
        }
      }
    }

    const checkGameOver = () => {
      if (!gameOver) {
        gameOver = isGameOver()

        if (gameOver) {
          const gameOverSound = new Audio(gameOverWav)

          gameOverSound.play()

          gameOverSound.onended = function() {
            // this.currentSrc = null;
            this.src = "";
            this.srcObject = null;
            this.remove();
          }
        }
      }
    }

    // && reactman.lifes == 0

    const isGameOver = () => {
      // console.log("reactman.lifes ==>", reactman.lifes)
      return ghosts.some(ghost => !reactman.powerPelletActive && ghost.collideWith(reactman))
    }

    const pause = () => {
      // console.log("paused ==>", paused)
      // if (paused) return true

      return !reactman.madeFirstMove || gameOver || gameWin || gamePaused
    }

    const drawGameEnd = () => {
      if (gameOver || gameWin) {
        let text = "You Beat The Level!"
        let text2 = "Press button below to play again"

        setWon(true)

        if (gameOver) {
          text = "Game Over!"

          setWon(false)
          setLost(true)
        }

        ctx.fillStyle = "black"
        ctx.fillRect(0, canvas.height / 700, canvas.width, 1200)

        ctx.font = '80px comic sans'
        ctx.fillStyle = 'white'
        ctx.fillText(text, 10, canvas.height / 2)

        ctx.font = '40px comic sans'
        ctx.fillText(text2, 10, canvas.height / 1.75)

        clearInterval(interval)
      }
    }
  }, [level])

  const nextLevel = () => {
    const canvas = document.getElementById('grid')
    const canvasParent = document.getElementById('gridParent')

    canvas.remove()

    const canvas2 = document.createElement('canvas')
    canvas2.setAttribute('id', 'grid')
    canvas2.classList.add('bg-white')
    canvas2.classList.add('w-[35rem]')
    canvas2.classList.add('h-[35rem]')
    canvas2.classList.add('mx-auto')
    canvas2.classList.add('my-auto')
    canvas2.classList.add('flex')
    canvas2.classList.add('flex-wrap')

    canvasParent.appendChild(canvas2)

    // console.log("hallååå")

    setLevel(level + 1)
  }

  const restartGame = () => {
    const canvas = document.getElementById('grid')
    const canvasParent = document.getElementById('gridParent')

    canvas.remove()

    const canvas2 = document.createElement('canvas')
    canvas2.setAttribute('id', 'grid')
    canvas2.classList.add('bg-white')
    canvas2.classList.add('w-[35rem]')
    canvas2.classList.add('h-[35rem]')
    canvas2.classList.add('mx-auto')
    canvas2.classList.add('my-auto')
    canvas2.classList.add('flex')
    canvas2.classList.add('flex-wrap')

    canvasParent.appendChild(canvas2)

    reactman.score = 0
    setScore(0)

    // console.log("hejdåååå")

    setLevel(1)
  }

  return (
    <div tabIndex={0} >
      <h1 className="mb-5">Game</h1>
        <div>
          <div onClick={() => {gamePaused = !gamePaused}} >Pause button</div>

          <div id="gridParent">
            <canvas id="grid" className="bg-white w-[35rem] h-[35rem] mx-auto my-auto flex flex-wrap " />
          </div>

          <h3>Score: {score}</h3>

          {won ? 
            <div onClick={() => {nextLevel()}} className="bg-white text-black">Go to next level</div>
          : ""}

          {lost ? 
            <div onClick={() => {restartGame()}} className="bg-white text-black">Play again?</div>
          : ""}
        </div> 
    </div>
  )
}

export default Game