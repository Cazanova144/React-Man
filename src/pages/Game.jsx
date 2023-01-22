import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import TileMap from '../components/TileMap'
import gameOverWav from '../assets/sounds/gameOver.wav'
import gameWinWav from '../assets/sounds/gameWin.wav'
import ReactmanLogo from '../assets/images/React-man logo.png'
 
const Game = () => {
  const {id} = useParams()

  const tileSize = 32
  const velocity = 2
  
  const tileMap = new TileMap(tileSize, id)
  const reactman = tileMap.getReactman(velocity)
  const ghosts = tileMap.getGhosts(velocity)
  
  const [lost, setLost] = useState(false)
  const [won, setWon] = useState(false)
  const [score, setScore] = useState(0)
  const [lifes, setLifes] = useState(3)
  const [lifesNextLevel, setLifesNextLevel] = useState()
  const [level, setLevel] = useState(1)
  const [triggerRestart, setTriggerRestart] = useState(false)
  const [pause, setPause] = useState(false)

  let gameOver = false
  let gameWin = false

  useEffect(() => {

    gameWin = false
    gameOver = false

    document.body.style.overflow = "hidden"

    const canvas = document.getElementById('grid')
    const ctx = canvas.getContext('2d')

    const gameLoop = () => {
      tileMap.draw(ctx);

      drawGameEnd()

      reactman.draw(ctx, pause(), ghosts)
      ghosts.forEach(ghost => ghost.draw(ctx, pause(), reactman))

      setScore(score + reactman.score)

      checkGameOver()
      checkGameWin()
    }
    
    tileMap.setCanvasSize(canvas)
    let interval = setInterval(gameLoop, 1000 / 75)

    const checkGameWin = () => {
      if (!gameWin) {
        gameWin = tileMap.didWin()

        if (gameWin) {

          const gameWinSound = new Audio(gameWinWav)

          gameWinSound.play()

          gameWinSound.onended = function() {
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

          if (lifesNextLevel) {
            console.log("här???")
            setLifesNextLevel(prevState => prevState - 1)
          } else {
            setLifes(prevState => prevState - 1)
          }

          gameOverSound.play()

          gameOverSound.onended = function() {
            this.src = "";
            this.srcObject = null;

            reactman.x = reactman.starterX
            reactman.y = reactman.starterY

            ghosts.forEach(ghost => {
              ghost.x = ghost.starterX
              ghost.y = ghost.starterY
            })

            this.remove();
            
            gameOver = false
          }
        } 
      }
    }

    const isGameOver = () => {
      return ghosts.some(ghost => !reactman.powerPelletActive && ghost.collideWith(reactman))
    }

    const pause = () => {
      return !reactman.madeFirstMove || gameOver || gameWin 
    }

    const drawGameEnd = () => {
      if (gameOver && (reactman.lifes == 0 || lifesNextLevel === 0) || gameWin) {
        let text = "You Beat The Level!"
        let text2 = "Press button below to play again"

        setWon(true)

        if (gameOver && (reactman.lifes == 0 || lifesNextLevel === 0)) {
          text = "Game Over!"

          setWon(false)
          setLost(true)
        } else if (gameOver && (reactman.lifes > 0 || lifesNextLevel > 0)) {
          setWon(false)
          setLost(false)

          gameOver = false
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
  }, [level, triggerRestart])

  

  const nextLevel = () => {
    console.log("lifes in nextLevel ==>", lifes)

    setLifesNextLevel(lifes)

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

    setWon(false)
    setLost(false)

    setLevel(prevLevel => prevLevel + 1)
  }

  const restartGame = () => {
    location.reload()
  }

  useEffect(() => {
    if (lifes == 0 || lifesNextLevel == 0) {
      setWon(false)

      setLost(true)

      console.log("?????")

      const canvasParent = document.getElementById('gridParent')
      const canvas = document.getElementById('grid')
      const div = document.createElement('div')
      const h1 = document.createElement('h1')
      const h2 = document.createElement('h2')

      h1.textContent = "Game Over!"
      h2.textContent = "Press button below to play again"

      div.classList.add('w-[35rem]')
      div.classList.add('h-[35rem]')
      div.classList.add('mx-auto')
      div.classList.add('my-auto')

      div.appendChild(h1)
      div.appendChild(h2)

      canvas.remove()

      canvasParent.appendChild(div)

    }
  }, [lifes, lifesNextLevel])

  // tabIndex={0}

  return (
    <div  className="flex flex-col" >
      <div className="w-[40rem] flex place-self-center">
        <img src={ReactmanLogo} alt="React-Man logo" className="w-max flex justify-center align-middle" />
      </div>
        <div>
          <div className="h-8">
            {level > 1 && lifesNextLevel > 0 ?
              `${lifesNextLevel} lifes left`
            : level == 1 && lifes !== 0 ?
              `${lifes} lifes left`
            : lifes == 0 || lifesNextLevel == 0 ?
             ""
            :
              ""
            }
          </div>

          <div id="gridParent">
            <canvas id="grid" className="bg-white w-[35rem] h-[35rem] mx-auto my-auto flex flex-wrap " />
          </div>

          <div className="">
              <h3>Score: {score}</h3>
          </div>

          {won ? 
            <div className="flex justify-center">
              <div onClick={() => {nextLevel()}} className="bg-blue-800 w-52 rounded-md">
                Go to next level
              </div>
            </div>
          : ""}

          {lost ? 
            <div onClick={() => {restartGame()}} className="flex justify-center" >
              <Link to={"/"} className="bg-blue-800 w-52 rounded-md">
                <button>Play again?</button>
              </Link>
            </div>
          : ""}
        </div> 
    </div>
  )
}

export default Game