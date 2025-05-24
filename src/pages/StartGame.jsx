import { useState } from 'react'
import {
  FaDog, FaPizzaSlice, FaFutbol, FaSmile,
  FaLeaf, FaGhost, FaRocket, FaStar,
  FaHeart, FaGamepad, FaRegSmileWink
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const categories = [
  { name: 'Animal', icon: <FaDog /> },
  { name: 'Food', icon: <FaPizzaSlice /> },
  { name: 'Sports', icon: <FaFutbol /> },
  { name: 'Emoji', icon: <FaSmile /> },
  { name: 'Nature', icon: <FaLeaf /> },
]

const floatingIcons = [
  { icon: <FaDog />, top: '12%', left: '20%', color: 'text-cyan-300', animation: 'animate-pulse' },
  { icon: <FaPizzaSlice />, top: '18%', left: '75%', color: 'text-pink-400', animation: 'animate-pulse' },
  { icon: <FaFutbol />, top: '70%', left: '12%', color: 'text-blue-400', animation: 'animate-pulse' },
  { icon: <FaLeaf />, top: '78%', left: '60%', color: 'text-purple-300', animation: 'animate-pulse' },
  { icon: <FaSmile />, top: '60%', left: '83%', color: 'text-yellow-300', animation: 'animate-pulse' },
]

export default function StartPage() {
  const [player1, setPlayer1] = useState({ name: '', category: '' })
  const [player2, setPlayer2] = useState({ name: '', category: '' })
  const navigate = useNavigate()

  const isStartDisabled = !player1.name || !player2.name || !player1.category || !player2.category

  const handleStart = () => {
    if (!isStartDisabled) {
      localStorage.setItem('player1', player1)
      localStorage.setItem('player2', player2)
      navigate('/play')
    }
  }

  const isCategoryDisabled = (catName, player) =>
    player === 1 ? player2.category === catName : player1.category === catName

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-violet-600 to-blue-700 overflow-hidden flex flex-col items-center justify-center px-6 text-center gap-4 md:gap-6">

      {floatingIcons.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.color} text-4xl md:text-6xl lg:text-7xl ${item.animation} pointer-events-none select-none`}
          style={{
            top: item.top,
            left: item.left,
            animationDelay: `${i * 0.5}s`,
          }}
          aria-hidden="true"
        >
          {item.icon}
        </div>
      ))}

      <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-xl mb-2 tracking-tight leading-tight">
        Let the Show Begin!
      </h1>

      <p className="text-white text-base md:text-lg lg:text-xl font-medium max-w-3xl drop-shadow-md px-2 leading-relaxed">
        Enter your names and choose a category that best reflects your vibe. Choose wisely — no duplicates allowed!
      </p>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10 w-full max-w-5xl mt-4">
        {[{ label: 'Player 1', state: player1, setState: setPlayer1, num: 1 }, { label: 'Player 2', state: player2, setState: setPlayer2, num: 2 }].map(({ label, state, setState, num }) => (
          <div key={label} className="bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md">
            <h2 className="text-2xl font-semibold mb-4 text-white">{label}</h2>
            <input
              type="text"
              placeholder="Your name here..."
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              className="w-full p-3 font-bold rounded-lg bg-white text-black mb-4"
            />
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(({ name, icon }) => (
                <button
                  key={name}
                  disabled={isCategoryDisabled(name, num)}
                  onClick={() => setState({ ...state, category: name })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                    ${state.category === name ? 'bg-yellow-400 text-black' : 'bg-white/20 hover:bg-white/30 text-white'}
                    ${isCategoryDisabled(name, num) ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  {icon} {name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleStart}
        disabled={isStartDisabled}
        className={`mt-8 px-10 py-3 rounded-xl font-semibold text-lg shadow-xl transition-all duration-300
          ${isStartDisabled
            ? 'bg-white/30 text-white/70 cursor-not-allowed'
            : 'bg-white text-violet-700 hover:bg-yellow-400 hover:text-black focus:ring-4 focus:ring-yellow-300'}`}
      >
        Start Game
      </button>
    </div>
  )
}
