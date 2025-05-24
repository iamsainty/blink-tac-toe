'use client'

import {
  FaGhost,
  FaRocket,
  FaStar,
  FaHeart,
  FaGamepad,
  FaRegSmileWink,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const floatingIcons = [
  { icon: <FaGamepad />, top: '10%', left: '22%', color: 'text-cyan-300', animation: 'animate-bounce' },
  { icon: <FaRegSmileWink />, top: '15%', left: '78%', color: 'text-pink-400', animation: 'animate-pulse' },
  { icon: <FaRocket />, top: '72%', left: '14%', color: 'text-blue-400', animation: 'animate-pulse' },
  { icon: <FaGhost />, top: '75%', left: '72%', color: 'text-purple-300', animation: 'animate-bounce' },
  { icon: <FaStar />, top: '22%', left: '52%', color: 'text-yellow-300', animation: 'animate-bounce' },
  { icon: <FaHeart />, top: '80%', left: '40%', color: 'text-red-400', animation: 'animate-pulse' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  const handleStart = () => {
    const audio = new Audio('/sound-effects/click.mp3')
    audio.play()
    navigate('/start')
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-violet-600 to-blue-700 overflow-hidden flex flex-col items-center justify-center px-6 text-center gap-4 md:gap-6">
      {floatingIcons.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.color} text-4xl md:text-6xl lg:text-7xl ${item.animation} pointer-events-none select-none`}
          style={{
            top: item.top,
            left: item.left,
            animationDelay: `${i * 0.6}s`,
          }}
          aria-hidden="true"
        >
          {item.icon}
        </div>
      ))}

      <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-xl mb-2 tracking-tight leading-tight">
        Bored of the same old Tic Tac Toe?
      </h1>

      <p className="text-white text-base md:text-lg lg:text-xl font-medium max-w-3xl drop-shadow-md px-2 leading-relaxed md:leading-relaxed">
        Say hello to <span className="font-extrabold text-yellow-400">Blink Tac Toe</span> — a chaotic twist on a classic game, where your moves vanish, strategies blink, and fun is guaranteed!
      </p>

      <p className="text-white text-base md:text-lg lg:text-xl font-medium max-w-3xl drop-shadow-md px-2 leading-relaxed md:leading-relaxed">
        Unpredictable. Hilarious. Competitive. Are you bold enough to take the challenge?
      </p>

      <button
        onClick={handleStart}
        className="relative bg-white text-violet-700 hover:bg-yellow-400 hover:text-black font-semibold py-3 px-8 rounded-2xl transition-all duration-300 shadow-xl inline-block mt-2">
        Let’s Blink It On!
      </button>
    </div>
  )
}
