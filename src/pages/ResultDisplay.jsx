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
  { icon: <FaCat />, top: '12%', left: '10%', color: 'text-yellow-300' },
  { icon: <FaIceCream />, top: '78%', left: '12%', color: 'text-pink-300' },
  { icon: <FaBasketballBall />, top: '18%', left: '80%', color: 'text-orange-300' },
  { icon: <FaTree />, top: '68%', left: '72%', color: 'text-green-300' },
  { icon: <FaGrinStars />, top: '78%', left: '46%', color: 'text-white' },
]

export default function ResultDisplay() {
  const [winner, setWinner] = useState('')
  const [player1, setPlayer1] = useState({ name: '', category: '' })
  const [player2, setPlayer2] = useState({ name: '', category: '' })
  const [playerWins, setPlayerWins] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const winnerName = localStorage.getItem('winner')
    const p1 = JSON.parse(localStorage.getItem('player1'))
    const p2 = JSON.parse(localStorage.getItem('player2'))
    const wins = JSON.parse(localStorage.getItem('playerWins'))

    setWinner(winnerName)
    setPlayer1(p1)
    setPlayer2(p2)
    setPlayerWins(wins)

    if(!p1 || !p2 || !winnerName) {
      navigate('/start')
    }
  }, [])

  const handleRematch = () => {
    localStorage.removeItem('winner')
    const audio = new Audio('/sound-effects/game-start.mp3')
    audio.play()
    navigate('/play')
  }

  const handleNewGame = () => {
    localStorage.clear()
    const clickAudio = new Audio('/sound-effects/click.mp3')
    clickAudio.play()
    navigate('/start')
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-600 to-blue-700 text-white text-center px-4 sm:px-6 py-10 sm:py-16 gap-8 overflow-hidden">
      
      {/* Floating Icons */}
      {floatingIcons.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.color} text-3xl sm:text-5xl lg:text-6xl animate-pulse pointer-events-none select-none transition-transform duration-500`}
          style={{ top: item.top, left: item.left, animationDelay: `${i * 0.25}s` }}
        >
          {item.icon}
        </div>
      ))}

      <div className="bg-white/10 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl shadow-2xl border border-white/20 max-w-xl w-full space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-300 flex items-center justify-center gap-3">
          <FaTrophy className="text-yellow-400 text-4xl sm:text-5xl" />
          {winner ? `${winner} Wins!` : 'We Have a Winner!'}
        </h1>

        <p className="text-base sm:text-lg text-white/90 font-medium">
          Kudos <span className="font-bold text-white">{winner}</span>! You blinked your way to glory!
        </p>

        <p className="text-sm sm:text-base text-white/70 italic">
          “Winning isn't everything... unless it’s Blink Tac Toe time!”
        </p>

        {/* Head-to-Head Score */}
        <div className="bg-white/10 border border-white/10 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-2">Head-to-Head Score</h3>
          <div className="flex justify-between text-base font-medium">
            <p>{player1.name || 'Player 1'}: <span className="text-yellow-300">{playerWins?.[player1.name] || 0}</span></p>
            <p>{player2.name || 'Player 2'}: <span className="text-yellow-300">{playerWins?.[player2.name] || 0}</span></p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRematch}
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-md"
          >
            <FaRedoAlt /> Rematch
          </button>
          <button
            onClick={handleNewGame}
            className="flex items-center justify-center gap-2 bg-white/20 hover:bg-pink-400 hover:text-black text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-md"
          >
            <FaUsers /> New Game
          </button>
        </div>
      </div>
    </div>
  )
}
