import { React, useEffect, useState } from 'react'

const Game = () => {

  // console.log("scoreDisplay ==>", scoreDisplay)
  const width = 28
  let reactmanCurrentIndex = 490
  // const [reactmanCurrentIndex, setReactmanCurrentIndex] = useState(490)
  // const [score, setScore] = useState(0)
  let score = 0

  // scoreDisplay.innerText = score

  // window.onload = function() {
  //   what();

  //   const what = () => {
  //     scoreDisplay.innerHTML = score
  //   }
  // }

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]

  // 0 - pellet
  // 1 - wall
  // 2 - ghost-spawn
  // 3 - power-pellet
  // 4 - empty

  const squares = []

  useEffect(() => {
    // console.log("useEffect körs")

    document.body.style.overflow = "hidden"

    const grid = document.getElementById('grid')

    const generateBoard = () => {
      for (let i = 0; i < layout.length; i++) {
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

    generateBoard()

    squares[reactmanCurrentIndex].classList.add('react-man')

  }, [])

  const pelletEaten = () => {
    if (squares[reactmanCurrentIndex].classList.contains('pellet')) {
      const scoreDisplay = document.getElementById('score')

      // console.log("score ==>", score)
      console.log("scoreDisplay ==>", scoreDisplay)
      score++
      scoreDisplay.innerHTML = score
      console.log("score ==>", score)
      // setScore(score + 1)
      // console.log("score ==>", score)
      squares[reactmanCurrentIndex].classList.remove('pellet')
    }
  }

  // useEffect(() => {
  //   console.log("score ==>", score)
  // }, [score])

  // useEffect(() => {
  //   console.log("reactManCurrentIndex ==>", reactmanCurrentIndex)
  // }, [reactmanCurrentIndex])

  const moveReactman = async (e) => {

    // console.log("case ==>", e.keyCode)

    console.log("reactmanCurrentIndex before ==>", reactmanCurrentIndex)

    console.log("squares[reactmanCurrentIndex] ==>", squares[reactmanCurrentIndex])

    await squares[reactmanCurrentIndex].classList.remove('react-man')

    switch(e.keyCode) {
      case 37:
        if (reactmanCurrentIndex % width !== 0 && !squares[reactmanCurrentIndex - 1].classList.contains('wall') && !squares[reactmanCurrentIndex - 1].classList.contains('ghost-spawn')) reactmanCurrentIndex -= 1

        if (reactmanCurrentIndex - 1 === 363) {
          reactmanCurrentIndex = 391
        }

        console.log("reactmanCurrentIndex in case ==>", reactmanCurrentIndex)
        
        break
      case 38: 
        if (reactmanCurrentIndex - width >= 0 && !squares[reactmanCurrentIndex - width].classList.contains('wall') && !squares[reactmanCurrentIndex - width].classList.contains('ghost-spawn')) reactmanCurrentIndex -= width

        console.log("reactmanCurrentIndex in case ==>", reactmanCurrentIndex)

        break
      case 39:
        if (reactmanCurrentIndex % width < width - 1 && !squares[reactmanCurrentIndex + 1].classList.contains('wall') && !squares[reactmanCurrentIndex + 1].classList.contains('ghost-spawn')) reactmanCurrentIndex += 1

        if (reactmanCurrentIndex + 1 === 392) {
          reactmanCurrentIndex = 364
        }

        console.log("reactmanCurrentIndex in case ==>", reactmanCurrentIndex)

        break
      case 40:
        if (reactmanCurrentIndex + width < width * width && !squares[reactmanCurrentIndex + width].classList.contains('wall') && !squares[reactmanCurrentIndex + width].classList.contains('ghost-spawn')) reactmanCurrentIndex += width

        console.log("reactmanCurrentIndex in case ==>", reactmanCurrentIndex)

        break
    }

    squares[reactmanCurrentIndex].classList.add('react-man')

    console.log("reactmanCurrentIndex after ==>", reactmanCurrentIndex)

    pelletEaten()
  }

  return (
    <div tabIndex={0} onKeyDown={moveReactman}>
        <h1 className="mb-5">Game</h1>

        <div id="grid" className="bg-white w-[35rem] h-[35rem] mx-auto my-auto flex flex-wrap ">
          
        </div>

        {/* <h3 id="score" className="my-5">Score :{score}</h3> */}
        <h3>Score: <span id="score"></span></h3>
    </div>
  )
}

export default Game