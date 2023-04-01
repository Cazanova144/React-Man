import React from 'react'
import { Link } from 'react-router-dom'
import ReactmanLogo from '../assets/images/React-man logo.png'

const Home = () => {
  return (
    <div className="flex flex-col">
        <div className="w-[45vw] xl:w-[35vw] 2xl:w-[25vw] flex place-self-center">
          <img src={ReactmanLogo} alt="React-Man logo" className="w-full flex justify-center align-middle" />
        </div>

        <div className="flex justify-around">
          <Link to={"/game/1"} className="bg-blue-800 w-52 rounded-md">
            <button>Play as Pac-Man?</button>
          </Link>

          <Link to={"/game/2"} className="bg-blue-800 w-52 rounded-md">
            <button>Play as React-Man?</button>
          </Link>

          <Link to={"/game/3"} className="bg-blue-800 w-52 rounded-md">
            <button>Play as Ms Pac-Man?</button>
          </Link>
        </div>
    </div>
  )
}

export default Home