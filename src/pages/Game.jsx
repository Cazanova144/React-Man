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
  const [lifes, setLifes] = useState()
  const [level, setLevel] = useState(1)

  let gamePaused = false

  // useEffect(() => {
  //   console.log("reactman lifes left ==>", reactman.lifes)
  // }, [reactman.lifes])

  useEffect(() => {
    // console.log("useEffect körs")

    document.body.style.overflow = "hidden"


    const canvas = document.getElementById('grid')
    const ctx = canvas.getContext('2d')

    // console.log("tileMap.layout ==>", tileMap.layout)

    let gameOver = false
    let gameWin = false

    const gameLoop = () => {
      // console.log("gameloop")
      tileMap.draw(ctx);

      drawGameEnd()

      reactman.draw(ctx, pause(), ghosts)
      ghosts.forEach(ghost => ghost.draw(ctx, pause(), reactman))

      // console.log("reactman.score ==>", reactman.score)
      setScore(reactman.score)
      // setLifes(reactman.lifes)

      checkGameOver()
      checkGameWin()
    }

    const checkGameWin = () => {
      if (!gameWin) {
        gameWin = tileMap.didWin()

        if (gameWin) {
          console.log("GE DIG FÖR FAN")

          const gameWinSound = new Audio(gameWinWav)

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
        let text = "you win"

        if (gameOver) {
          text = "game over"
          setLost(true)
        }

        if (gameWin) {
          setWon(true)
        }

        ctx.fillStyle = "black"
        ctx.fillRect(0, canvas.height/3.2, canvas.width, 80)
      }
    }

    tileMap.setCanvasSize(canvas)
    setInterval(gameLoop, 1000 / 75)

  }, [level])

  return (
    <div tabIndex={0} >
      <h1 className="mb-5">Game</h1>



      {!lost && !won ? 
        <div>
          <div onClick={() => {gamePaused = !gamePaused}} >Pause button</div>

          <canvas id="grid" className="bg-white w-[35rem] h-[35rem] mx-auto my-auto flex flex-wrap " />

          <h3>Score: {score}</h3>
        </div> 
      : lost ?
        <div>
          <h1>Game Over!</h1>

          <h2>Final score: {score}</h2>
        </div>
      : won ?
        <div>
          <h1>You Beat The Level!</h1>

          <h2>Final Score: {score}</h2>

          <h3 onClick={() => {setLevel(level + 1)}}>Next Level?</h3>
        </div>
      : ""}
    </div>
  )
}

export default Game