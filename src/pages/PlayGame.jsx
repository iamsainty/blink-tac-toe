import {
    FaDog, FaCat, FaHorse, FaFrog, FaFish, FaSpider,
    FaPizzaSlice, FaIceCream, FaHamburger, FaHotdog, FaAppleAlt, FaCandyCane,
    FaFutbol, FaBasketballBall, FaTableTennis, FaBaseballBall, FaRunning, FaSwimmer,
    FaSmile, FaLaughBeam, FaGrinHearts, FaSurprise, FaGrinStars, FaKissWinkHeart,
    FaLeaf, FaTree, FaCloud, FaSun, FaWater, FaSnowflake
  } from 'react-icons/fa'
  
  import { useEffect, useState } from 'react'
  
  const floatingIcons = [
    { icon: <FaDog />, top: '12%', left: '20%', color: 'text-cyan-300' },
    { icon: <FaPizzaSlice />, top: '18%', left: '75%', color: 'text-pink-400' },
    { icon: <FaFutbol />, top: '70%', left: '12%', color: 'text-blue-400' },
    { icon: <FaLeaf />, top: '78%', left: '60%', color: 'text-purple-300' },
    { icon: <FaSmile />, top: '60%', left: '83%', color: 'text-yellow-300' },
    { icon: <FaTree />, top: '40%', left: '30%', color: 'text-green-300' },
  ]
  
  export default function PlayPage() {
    const [player1, setPlayer1] = useState({ name: '', category: '' })
    const [player2, setPlayer2] = useState({ name: '', category: '' })
    const [currentTurn, setCurrentTurn] = useState('')
  
    useEffect(() => {
      const p1 = JSON.parse(localStorage.getItem('player1'))
      const p2 = JSON.parse(localStorage.getItem('player2'))
      setPlayer1(p1)
      setPlayer2(p2)
      setCurrentTurn(p1?.name || '')
    }, [])
  
    return (
      <div className="relative min-h-screen w-full bg-gradient-to-br from-violet-600 to-blue-700 p-6 md:p-20 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-white overflow-hidden">
  
        {/* Floating Icons */}
        {floatingIcons.map((item, i) => (
          <div
            key={i}
            className={`absolute ${item.color} text-4xl md:text-6xl lg:text-7xl animate-float pointer-events-none select-none transition-transform duration-500`}
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
  
        {/* Player 1 Card */}
        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl w-full md:w-1/4 text-center border border-white/20 hover:scale-105 transition duration-300">
          <h2 className="text-3xl font-bold mb-2">{player1.name || 'Player 1'}</h2>
          <p className="text-sm text-white/80 mb-4 tracking-wide uppercase">
            Selected Category: <span className="font-bold text-yellow-300">{player1.category}</span>
          </p>
        </div>
  
        {/* Game Board */}
        <div className="w-full md:w-2/4 flex flex-col items-center gap-6">
          <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
            {Array.from({ length: 9 }).map((_, i) => (
              <button
                key={i}
                className="bg-white/20 hover:bg-yellow-300 hover:text-black text-4xl aspect-square rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center"
              >
                {/* Icon will appear here */}
              </button>
            ))}
          </div>
          <p className="text-lg md:text-xl mt-2 bg-white/10 px-6 py-2 rounded-full border border-white/20 shadow-md">
            Current Turn: <span className="font-bold text-yellow-300">{currentTurn}</span>
          </p>
        </div>
  
        {/* Player 2 Card */}
        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl w-full md:w-1/4 text-center border border-white/20 hover:scale-105 transition duration-300">
          <h2 className="text-3xl font-bold mb-2">{player2.name || 'Player 2'}</h2>
          <p className="text-sm text-white/80 mb-4 tracking-wide uppercase">
            Selected Category: <span className="font-bold text-yellow-300">{player2.category}</span>
          </p>
        </div>
      </div>
    )
  }
  