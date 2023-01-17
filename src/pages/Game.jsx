import { React, useEffect, useState } from 'react'
import TileMap from '../components/TileMap'
import gameOverWav from '../assets/sounds/gameOver.wav'
import gameWinWav from '../assets/sounds/gameWin.wav'

const Game = () => {

  
  const tileSize = 32
  const velocity = 2

  const [lost, setLost] = useState(false)
  const [won, setWon] = useState(false)
  const [score, setScore] = useState(0)

  let gamePaused = false

  useEffect(() => {
    // console.log("useEffect körs")

    document.body.style.overflow = "hidden"


    const canvas = document.getElementById('grid')
    const ctx = canvas.getContext('2d')
    const tileMap = new TileMap(tileSize)
    const reactman = tileMap.getReactman(velocity)
    const ghosts = tileMap.getGhosts(velocity)

    // console.log("tileMap.layout ==>", tileMap.layout)

    let gameOver = false
    let gameWin = false

    const gameOverSound = new Audio(gameOverWav)
    const gameWinSound = new Audio(gameWinWav)

    const gameLoop = () => {
      // console.log("gameloop")
      tileMap.draw(ctx);

      drawGameEnd()

      reactman.draw(ctx, pause(), ghosts)
      ghosts.forEach(ghost => ghost.draw(ctx, pause(), reactman))

      // console.log("reactman.score ==>", reactman.score)
      setScore(reactman.score)

      checkGameOver()
      checkGameWin()
    }

    const checkGameWin = () => {
      if (!gameWin) {
        gameWin = tileMap.didCollideWithEnvironment()

        if (gameWin) {
          setFina
          gameWinSound.play()
        }
      }
    }

    const checkGameOver = () => {
      if (!gameOver) {
        gameOver = isGameOver()

        if (gameOver) {
          gameOverSound.play()
        }
      }
    }

    const isGameOver = () => {
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

  }, [])

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
        </div>
      : ""}
    </div>
  )
}

export default Game