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
  const [lifesNextLevel, setLifesNextLevel] = useState()
  const [lifesInScope, setLifesInScope] = useState(3)
  const [level, setLevel] = useState(1)
  const [triggerRestart, setTriggerRestart] = useState(false)

  let gamePaused = false

  let gameOver = false
  let gameWin = false

  let scopedLifes = 3

  // const lifeFunction = () => {
  //   console.log("scopedLifes in beginning of function ==>", scopedLifes)

  //   scopedLifes -= 1

  //   console.log("scopedLifes in end of function ==>", scopedLifes)
  // }

  useEffect(() => {
      // setWon(false)
      // setLost(false)

    // console.log("level ==>", level)

    // console.log("funkar useEffect?")

    // console.log("reactman.lifes in beginning of big useEffect ==>", reactman.lifes)
    console.log("lifes in beginning of big useEffect ==>", lifes)
    console.log("lifesNextLevel in beginning of big useEffect ==>", lifesNextLevel)



    // console.log("gameOver in useEffect ==>", gameOver)
    // console.log("gameWin in useEffect ==>", gameWin)

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

      // if (ghosts.collideWith(reactman)) {
      //   console.log("cowabunga")
      // }
      // console.log("reactman.lifes in gameLoop ==>", reactman.lifes)
      
      
      // setLifes(reactman.lifes)
      
      
      // if (reactman.lifes == 2) {
      //   setLifes(2)
      // } else if (reactman.lifes == 1) {
      //   setLifes(1)
      // }
      
      // console.log("lifes in gameLoop ==>", lifes)
      // if (reactman.lifes === 3) {
        
      // } else if (reactman.lifes === 2) {
      //   // console.log("awooga")
      //   // setLifes(2)
      // } else if (reactman.lifes === 1) {
      //   // console.log("big mommy milkers")
      // }

      // reactman.lifes = lifes

      // console.log("reactman lifes left ==>", reactman.lifes)
      // console.log("lifes ==>", lifes)

      drawGameEnd()

      reactman.draw(ctx, pause(), ghosts)
      ghosts.forEach(ghost => ghost.draw(ctx, pause(), reactman))

      // console.log("reactman.lifes ==>", reactman.lifes)
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
        
        // console.log("scopedLifes ==>", scopedLifes)

        // console.log("gameOver ==>", gameOver)

        if (gameOver) {
          const gameOverSound = new Audio(gameOverWav)
          
          // console.log("reactman.lifes in scope ==>", reactman.lifes)

          // reactman.lifes = reactman.lifes - 1
          // console.log("reactman.lifes in scope after substraction ==>", reactman.lifes)

          // console.log("lifes ==>", lifes)
          // console.log("lifesInScope ==>", lifesInScope)

          if (lifesNextLevel) {
            setLifesNextLevel(prevState => prevState - 1)
          } else {
            setLifes(prevState => prevState - 1)
          }


          // console.log("ayoo")

          // lifeFunction()

          gameOverSound.play()

          gameOverSound.onended = function() {
            // this.currentSrc = null;
            this.src = "";
            this.srcObject = null;

            reactman.x = reactman.starterX
            reactman.y = reactman.starterY

            ghosts.forEach(ghost => {
              ghost.x = ghost.starterX
              ghost.y = ghost.starterY
            })
            // console.log("lifes after set ==>", lifes)
            this.remove();

            // setLifes(prevCount => prevCount - 1) 
            
            gameOver = false
            
            // scopedLifes = scopedLifes - 1
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

      // if (gameOver && lifes > 0) gameOver = false

      return !reactman.madeFirstMove || gameOver || gameWin || gamePaused
    }

    const drawGameEnd = () => {
      if (gameOver && reactman.lifes == 0 || gameWin) {
        let text = "You Beat The Level!"
        let text2 = "Press button below to play again"

        setWon(true)

        if (gameOver && reactman.lifes == 0) {
          text = "Game Over!"

          setWon(false)
          setLost(true)
        } else if (gameOver && reactman.lifes > 0) {
          setWon(false)
          setLost(false)

          gameOver = false
        }

        // console.log("reactman.lifes in drawGameEnd ==>", reactman.lifes)

        // console.log("lifes in drawGameEnd ==>", lifes)

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

    // console.log("reactman.lifes in beginning of nextLevel function ==>", reactman.lifes)

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

    // reactman.lifes = reactman.lifes

    setWon(false)
    setLost(false)

    // console.log("nextLevel function")

    // console.log("reactman.lifes in nextLevel function ==>", reactman.lifes)

    // console.log("hallååå")

    setLevel(prevLevel => prevLevel + 1)
  }

  const restartGame = () => {

    location.reload()

    // const canvas = document.getElementById('grid')
    // const canvasParent = document.getElementById('gridParent')

    // canvas.remove()

    // const canvas2 = document.createElement('canvas')
    // canvas2.setAttribute('id', 'grid')
    // canvas2.classList.add('bg-white')
    // canvas2.classList.add('w-[35rem]')
    // canvas2.classList.add('h-[35rem]')
    // canvas2.classList.add('mx-auto')
    // canvas2.classList.add('my-auto')
    // canvas2.classList.add('flex')
    // canvas2.classList.add('flex-wrap')

    // canvasParent.appendChild(canvas2)

    // reactman.score = 0
    // setScore(0)

    // console.log("gameOver in restartGame ==>", gameOver)
    // console.log("gameWin in restartGame ==>", gameWin)

    // console.log("restartGame function")
    // console.log("reactman.lifes in restart ==>", reactman.lifes)

    // setLevel(0)

    // setWon(false)
    // setLost(false)

    // if (level == 1) {
    //   // setLevel(0)
    //   // setLevel(1)

    //   setTriggerRestart(prevState => !prevState)
    // } else {
    //   setLevel(1)
    // }

  }

  useEffect(() => {

    console.log("lifes ==>", lifes)

    console.log("lifesNextLevel ==>", lifesNextLevel)

    // if (lifesNextLevel) setLifes(lifesNextLevel)

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


    // console.log("lifes ==>", lifes)
  }, [lifes, lifesNextLevel])

  // useEffect(() => {
  //   console.log("level ==>", level)
  // }, [level])

  return (
    <div tabIndex={0} >
      <h1 className="mb-5">Game</h1>
        <div>
          <div onClick={() => {gamePaused = !gamePaused}} >Pause button</div>

          <div>
            {lifesNextLevel !== undefined ?
              lifesNextLevel
            :
              lifes
            }
          </div>

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