import React from 'react'
import { Link } from 'react-router-dom'
import Game from './Game'

const Home = () => {
  return (
    <div>
        <h1>React-Man</h1>

        <Link to={"/game/1"}>
          <button>Play as Pac-Man?</button>
        </Link>

        <Link to={"/game/2"}>
          <button>Play as React-Man?</button>
        </Link>

        <Link to={"/game/3"}>
          <button>Play as Ms Pac-Man?</button>
        </Link>
    </div>
  )
}

export default Home