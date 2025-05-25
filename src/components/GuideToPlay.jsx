import React from 'react'
import { FaGamepad } from 'react-icons/fa'
import { IoIosClose } from "react-icons/io";


const GuideToPlay = ({setShowGuide}) => {
    const handleClose = () => {
        const audio = new Audio('/sound-effects/click.mp3')
        audio.play()
        setShowGuide(false)
    }
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-20 flex flex-col items-center backdrop-blur-sm justify-center px-4 gap-6">
        <div className='rounded-full bg-red-800 text-white h-10 w-10 flex items-center justify-center' onClick={handleClose}>
        <IoIosClose size={40} />
        </div>
      <div className="container max-w-3xl bg-white/10 bg-gradient-to-br from-violet-600 to-blue-700  text-white border-2 border-yellow-400 rounded-2xl shadow-2xl p-6 md:p-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-300 flex items-center justify-center gap-2">
How to Play Blink Tac Toe
          </h2>
          <p className="text-white/80 mt-2 text-base md:text-lg">
            Quick guide for first-time blinkers!
          </p>
        </div>

        <ol className="list-decimal list-inside text-white text-left text-sm md:text-base leading-relaxed space-y-3 px-4">
          <li>
            Each player enters their <span className="text-yellow-300 font-semibold">name</span> and chooses a unique emoji category like Animal, Food, Sports, etc.
          </li>
          <li>
            The game begins on a 3×3 grid. Players take turns to place an emoji from their category in any empty cell.
          </li>
          <li>
            Each player can have only <span className="text-yellow-300 font-semibold">3 emojis</span> on the board at once.
          </li>
          <li>
            When a player places a <span className="text-yellow-300 font-semibold">4th emoji</span>, their oldest one vanishes automatically — it’s a blink game!
          </li>
          <li>
            A player <span className="text-green-300 font-semibold">wins</span> by placing 3 of their emojis in a straight line — horizontally, vertically, or diagonally.
          </li>
          <li>
            No draws are possible — the game continues until someone wins.
          </li>
        </ol>
      </div>
    </div>
  )
}

export default GuideToPlay