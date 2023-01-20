import { Routes, Route } from 'react-router'
import Game from './pages/Game'
import Home from './pages/Home'
import './App.css'

function App() {

  return (
    <div className="App text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </div>
  )
}

export default App
