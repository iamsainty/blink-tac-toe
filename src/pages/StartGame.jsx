import { useMemo, useState } from 'react'
import {
  FaDog, FaPizzaSlice, FaFutbol, FaSmile,
  FaLeaf
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
  { icon: <FaDog />, top: '8%', left: '15%', color: 'text-cyan-300', animation: 'animate-pulse' },
  { icon: <FaPizzaSlice />, top: '18%', left: '75%', color: 'text-pink-400', animation: 'animate-pulse' },
  { icon: <FaFutbol />, top: '70%', left: '12%', color: 'text-blue-400', animation: 'animate-pulse' },
  { icon: <FaLeaf />, top: '78%', left: '60%', color: 'text-purple-300', animation: 'animate-pulse' },
  { icon: <FaSmile />, top: '60%', left: '83%', color: 'text-yellow-300', animation: 'animate-pulse' },
]

export default function StartPage() {
  const [player1, setPlayer1] = useState({ name: '', category: '' })
  const [player2, setPlayer2] = useState({ name: '', category: '' })
  const navigate = useNavigate()

  const keypressAudio = useMemo(() => new Audio('/sound-effects/keypress.mp3'), [])
  const isStartDisabled =
  !player1.name ||
  !player2.name ||
  !player1.category ||
  !player2.category ||
  player1.name.trim().toLowerCase() === player2.name.trim().toLowerCase()

  const handleStart = () => {
    if (!isStartDisabled) {
      new Audio('/sound-effects/click.mp3').play()
      localStorage.setItem('player1', JSON.stringify(player1))
      localStorage.setItem('player2', JSON.stringify(player2))
      localStorage.setItem('playerWins', JSON.stringify({ [player1.name]: 0, [player2.name]: 0 }))
      new Audio('/sound-effects/game-start.mp3').play()
      navigate('/play')
    }
  }

  const isCategoryDisabled = (catName, player) =>
    player === 1 ? player2.category === catName : player1.category === catName

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 text-center gap-4 sm:px-6 sm:gap-6 md:gap-8">

      {/* Floating Icons */}
      {floatingIcons.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.color} text-3xl sm:text-5xl lg:text-6xl ${item.animation} pointer-events-none select-none`}
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

      {/* Heading */}
      <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-xl tracking-tight leading-tight mb-1">
        Let the Show Begin!
      </h1>

      {/* Subheading */}
      <p className="text-white text-sm sm:text-base md:text-lg max-w-3xl drop-shadow-md px-2 leading-relaxed">
        Enter your names and choose a category that best reflects your vibe.
      </p>

      {isStartDisabled && (
        <p className="text-white opacity-75 text-xs sm:text-base md:text-lg max-w-3xl drop-shadow-md leading-relaxed">
          Name and category should be different for both players.
        </p>
      )}

      {/* Player Inputs */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-10 w-full max-w-5xl mt-2">
        {[{ label: 'Player 1', state: player1, setState: setPlayer1, num: 1 }, { label: 'Player 2', state: player2, setState: setPlayer2, num: 2 }].map(({ label, state, setState, num }) => (
          <div key={label} className="bg-white/10 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-md">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-white">{label}</h2>
            <input
              type="text"
              placeholder="Your name here..."
              value={state.name}
              onKeyDown={() => {
                keypressAudio.currentTime = 0
                keypressAudio.play()
              }}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              className="w-full p-2 sm:p-3 font-semibold rounded-lg bg-white text-black mb-4 text-sm sm:text-base text-voilet-500"
            />
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(({ name, icon }) => (
                <button
                  key={name}
                  disabled={isCategoryDisabled(name, num)}
                  onClick={() => {
                    new Audio('/sound-effects/click.mp3').play()
                    setState({ ...state, category: name })
                  }}
                  className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm sm:text-base font-semibold transition-all duration-300
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

      {/* Start Button */}
      <button
        onClick={handleStart}
        disabled={isStartDisabled}
        className={`mt-6 sm:mt-8 px-8 sm:px-10 py-3 rounded-xl font-semibold text-base sm:text-lg shadow-xl transition-all duration-300
          ${isStartDisabled
            ? 'bg-white/30 text-white/70 cursor-not-allowed'
            : 'bg-white text-violet-700 hover:bg-yellow-400 hover:text-black focus:ring-4 focus:ring-yellow-300'}`}
      >
        Start Game
      </button>
    </div>
  )
}
