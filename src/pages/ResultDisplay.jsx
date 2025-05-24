import {
    FaTrophy,
    FaRedoAlt,
    FaUsers,
    FaCat,
    FaIceCream,
    FaBasketballBall,
    FaTree,
    FaGrinStars,
  } from 'react-icons/fa'
  import { useEffect, useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  
  const floatingIcons = [
    { icon: <FaCat />, top: '12%', left: '10%', color: 'text-yellow-300', animation: 'animate-pulse' },
    { icon: <FaIceCream />, top: '78%', left: '12%', color: 'text-pink-300', animation: 'animate-pulse' },
    { icon: <FaBasketballBall />, top: '18%', left: '80%', color: 'text-orange-300', animation: 'animate-pulse' },
    { icon: <FaTree />, top: '68%', left: '72%', color: 'text-green-300', animation: 'animate-pulse' },
    { icon: <FaGrinStars />, top: '78%', left: '46%', color: 'text-white', animation: 'animate-pulse' },
  ]
  
  export default function ResultDisplay() {
    const [winner, setWinner] = useState('')
    const navigate = useNavigate()
  
    useEffect(() => {
      const winnerName = localStorage.getItem('winner')
      setWinner(winnerName)
    }, [])
  
    const handleRematch = () => {
      localStorage.removeItem('winner')
      navigate('/play')
    }
  
    const handleNewGame = () => {
      localStorage.clear()
      navigate('/start')
    }
  
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-600 to-blue-700 text-white text-center px-6 py-12 gap-6 overflow-hidden">
  
        {/* Floating Icons */}
        {floatingIcons.map((item, i) => (
          <div
            key={i}
            className={`absolute ${item.color} text-4xl md:text-6xl lg:text-7xl ${item.animation} pointer-events-none select-none`}
            style={{ top: item.top, left: item.left, animationDelay: `${i * 0.3}s` }}
          >
            {item.icon}
          </div>
        ))}
  
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 max-w-xl w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-300 flex items-center justify-center gap-3 mb-4">
            <FaTrophy className="text-yellow-400 text-5xl" />
            {winner ? `${winner} Wins!` : 'We Have a Winner!'}
          </h1>
  
          <p className="text-lg md:text-xl text-white/90 mb-6 font-medium">
            Kudos <span className="font-bold text-white">{winner}</span>! You blinked your way to glory!
          </p>
  
          <p className="text-sm md:text-base text-white/70 italic mb-8">
            “Winning isn't everything... unless it’s Blink Tac Toe time!”
          </p>
  
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRematch}
              className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-xl transition transform hover:scale-105 shadow-lg"
            >
              <FaRedoAlt /> Rematch
            </button>
            <button
              onClick={handleNewGame}
              className="flex items-center justify-center gap-2 bg-white/20 hover:bg-pink-400 hover:text-black text-white font-semibold px-6 py-3 rounded-xl transition transform hover:scale-105 shadow-lg"
            >
              <FaUsers /> New Game
            </button>
          </div>
        </div>
      </div>
    )
  }
  