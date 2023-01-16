import { React, useEffect, useState } from 'react'
import TileMap from '../components/TileMap'
import gameOverWav from '../assets/sounds/gameOver.wav'
import gameWinWav from '../assets/sounds/gameWin.wav'

const Game = () => {

  
  const tileSize = 32
  const velocity = 2

  // console.log("scoreDisplay ==>", scoreDisplay)
  const width = 28
  let reactmanCurrentIndex = 490
  // const [reactmanCurrentIndex, setReactmanCurrentIndex] = useState(490)
  const [finalScore, setFinalScore] = useState(0)
  let score = 0
  const [lost, setLost] = useState(false)
  const [won, setWon] = useState(false)

  // scoreDisplay.innerText = score

  // window.onload = function() {
  //   what();

  //   const what = () => {
  //     scoreDisplay.innerHTML = score
  //   }
  // }

  const squares = []

  const generateBoard = () => {
    for (let i = 0; i < layout.length; i++) {
      const grid = document.getElementById('grid')
      // console.log("grid ==>", grid)
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      // add layout to the board
      if (layout[i] === 0) {
        squares[i].classList.add('pellet')
      } else if (layout[i] === 1) {
        squares[i].classList.add('wall')
      } else if (layout[i] === 2) {
        squares[i].classList.add('ghost-spawn')
      } else if (layout[i] === 3) {
        squares[i].classList.add('power-pellet')
      }

      // console.log("funktionen körs")
    }
  }

  useEffect(() => {
    // console.log("useEffect körs")

    document.body.style.overflow = "hidden"


    const canvas = document.getElementById('grid')
    const ctx = canvas.getContext('2d')
    const tileMap = new TileMap(tileSize)
    const reactman = tileMap.getReactman(velocity)
    const ghosts = tileMap.getGhosts(velocity)

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

      checkGameOver()
      checkGameWin()
    }

    const checkGameWin = () => {
      if (!gameWin) {
        gameWin = tileMap.didCollideWithEnvironment()

        if (gameWin) {
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
      return !reactman.madeFirstMove || gameOver || gameWin
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

    // generateBoard()

    // squares[reactmanCurrentIndex].classList.add('react-man')

    // ghosts.forEach(ghost => {
    //   squares[ghost.currentIndex].classList.add(ghost.className)
    //   squares[ghost.currentIndex].classList.add('ghost')
    // })

    // ghosts.forEach(ghost => moveGhost(ghost))

  }, [])

  // class for ghosts 
  // class Ghost {
  //   constructor(className, startIndex, speed) {
  //     this.className = className
  //     this.startIndex = startIndex
  //     this.speed = speed
  //     this.currentIndex = startIndex
  //     this.timerId = NaN
  //     this.isScared = false
  //     }
  // }
  
  // const ghosts = [
  //   new Ghost('blinky', 348, 250),
  //   new Ghost('pinky', 376, 400),
  //   new Ghost('inky', 351, 300),
  //   new Ghost('clyde', 379, 500)
  // ]

  // function for moving ghosts

  // const moveGhost = (ghost) => {

  //   const directions = [-1, +1, width, -width]
  //   let direction = directions[Math.floor(Math.random() * directions.length)]

  //   ghost.timerId = setInterval(function() {
      
  //     // if (lost) return
  //     // console.log("lost after return in moveGhost ==>", lost)

  //     // if next square is neither a wall or ghost, go there

  //     if (!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {

  //       // remove ghost classes
  //       squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')

  //       // change currentIndex to new square
  //       ghost.currentIndex += direction

  //       // put ghost in new currentIndex
  //       squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

  //     } else direction = directions[Math.floor(Math.random() * directions.length)]

  //     // if the ghost is in "fright-mode" ("scared")

  //     if (ghost.isScared) {

  //       // add class of "scared-ghost"
  //       squares[ghost.currentIndex].classList.add('scared-ghost')
  //     }

  //     // if the ghost is in "fright-mode" AND React-Man runs into it

  //     if (ghost.isScared && squares[ghost.currentIndex].classList.contains('react-man')) {

  //       // remove ghost
  //       squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')

  //       // set currentIndex to it's starting point
  //       ghost.currentIndex = ghost.startIndex

  //       // add 100 to scoreboard
  //       score += 100

  //       // re-add ghost to start position
  //       squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
  //     }
  //   }, ghost.speed)

  // }

  // // function for eating pellets

  // const pelletEaten = () => {
  //   if (squares[reactmanCurrentIndex].classList.contains('pellet')) {
  //     const scoreDisplay = document.getElementById('score')

  //     // console.log("score ==>", score)
  //     // console.log("scoreDisplay ==>", scoreDisplay)
  //     score++
  //     scoreDisplay.innerHTML = score
  //     // console.log("score ==>", score)
  //     // setScore(score + 1)
  //     // console.log("score ==>", score)
  //     squares[reactmanCurrentIndex].classList.remove('pellet')
  //   }
  // }

  // // function for eating power pellets 

  // const powerPelletEaten = () => {
  //   if (squares[reactmanCurrentIndex].classList.contains('power-pellet')) {
  //     // console.log("powerPelletEaten works!")
  //     score += 10
  //     ghosts.forEach(ghost => ghost.isScared = true)
  //     setTimeout(stopFrightMode, 10000)
  //     squares[reactmanCurrentIndex].classList.remove('power-pellet')
  //   }
  // }

  // // function for making ghosts get out of "fright-mode" (stop them from being "scared")

  // const stopFrightMode = () => {
  //   ghosts.forEach(ghost => ghost.isScared = false)
  //   // console.log("stopFrightMode works!")
  // }

  // // check if player lost

  // const checkForGameOver = () => {

  //   // if React-Man runs into a ghost, and that ghost isn't in fright-mode ("scared")
  //   if (squares[reactmanCurrentIndex].classList.contains('ghost') && !squares[reactmanCurrentIndex].classList.contains('scared-ghost')) {

  //     // set lost state to "true"
  //     setLost(true)

  //     // set final score state to current score
  //     setFinalScore(score)
  //   }
  // }

  // const checkForWin = () => {

  //   // if you win the level
  //   if (score >= 274 && !document.getElementsByClassName('pellet').length && !document.getElementsByClassName('power-pellet').length) {
      
  //     // set won state to "true"
  //     setWon(true)

  //     // set final score state to current score
  //     setFinalScore(score)
  //   }
  // }

  // const MovingDirection = {
  //   up: 0,
  //   down: 1,
  //   left: 2,
  //   right: 3,
  // };

  

  // const moveReactman = (e) => {

  //   console.log("case ==>", e.keyCode)

  //   // console.log("reactmanCurrentIndex before ==>", reactmanCurrentIndex)

  //   // console.log("squares[reactmanCurrentIndex] ==>", squares[reactmanCurrentIndex])

  //   squares[reactmanCurrentIndex].classList.remove('react-man')

  //   switch(e.keyCode) {
  //     case 37:
  //       if (reactmanCurrentIndex % width !== 0 && !squares[reactmanCurrentIndex - 1].classList.contains('wall') && !squares[reactmanCurrentIndex - 1].classList.contains('ghost-spawn')) {
  //         reactmanCurrentIndex -= 1
  //       }

  //       if (reactmanCurrentIndex - 1 === 363) {
  //         reactmanCurrentIndex = 391
  //       }

  //       // console.log("reactmanCurrentIndex in case ==>", reactmanCurrentIndex)
        
  //       break
  //     case 38: 
  //       if (reactmanCurrentIndex - width >= 0 && !squares[reactmanCurrentIndex - width].classList.contains('wall') && !squares[reactmanCurrentIndex - width].classList.contains('ghost-spawn')) {
  //         reactmanCurrentIndex -= width
  //       }

  //       // console.log("reactmanCurrentIndex in case ==>", reactmanCurrentIndex)

  //       break
  //     case 39:
  //       if (reactmanCurrentIndex % width < width - 1 && !squares[reactmanCurrentIndex + 1].classList.contains('wall') && !squares[reactmanCurrentIndex + 1].classList.contains('ghost-spawn')) {
  //         reactmanCurrentIndex += 1
  //       }

  //       if (reactmanCurrentIndex + 1 === 392) {
  //         reactmanCurrentIndex = 364
  //       }

  //       // console.log("reactmanCurrentIndex in case ==>", reactmanCurrentIndex)

  //       break
  //     case 40:
  //       if (reactmanCurrentIndex + width < width * width && !squares[reactmanCurrentIndex + width].classList.contains('wall') && !squares[reactmanCurrentIndex + width].classList.contains('ghost-spawn')) {
  //         reactmanCurrentIndex += width
  //       }

  //       // console.log("reactmanCurrentIndex in case ==>", reactmanCurrentIndex)

  //       break
  //   }

  //   squares[reactmanCurrentIndex].classList.add('react-man')

  //   // functions for different events in game

  //   pelletEaten()
  //   powerPelletEaten()
  //   checkForGameOver()
  //   checkForWin()
  // }

  // onKeyDown={moveReactman}

  return (
    <div tabIndex={0} >
      <h1 className="mb-5">Game</h1>



      {!lost && !won ? 
        <div>
          <canvas id="grid" className="bg-white w-[35rem] h-[35rem] mx-auto my-auto flex flex-wrap " />

          <h3>Score: <span id="score"></span></h3>
        </div> 
      : lost ?
        <div>
          <h1>Game Over!</h1>

          <h2>Final score: {finalScore}</h2>
        </div>
      : won ?
        <div>
          <h1>You Beat The Level!</h1>

          <h2>Final Score: {finalScore}</h2>
        </div>
      : ""}
    </div>
  )
}

export default Game