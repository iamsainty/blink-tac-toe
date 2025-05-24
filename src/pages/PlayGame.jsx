import {
    FaDog, FaCat, FaHorse, FaFrog, FaFish, FaSpider,
    FaPizzaSlice, FaIceCream, FaHamburger, FaHotdog, FaAppleAlt, FaCandyCane,
    FaFutbol, FaBasketballBall, FaTableTennis, FaBaseballBall, FaRunning, FaSwimmer,
    FaSmile, FaLaughBeam, FaGrinHearts, FaSurprise, FaGrinStars, FaKissWinkHeart,
    FaLeaf, FaTree, FaCloud, FaSun, FaWater, FaSnowflake
  } from 'react-icons/fa'
  
  import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
  
  const allIcons = {
    Animal: [FaDog, FaCat, FaHorse, FaFrog, FaFish, FaSpider],
    Food: [FaPizzaSlice, FaIceCream, FaHamburger, FaHotdog, FaAppleAlt, FaCandyCane],
    Sports: [FaFutbol, FaBasketballBall, FaTableTennis, FaBaseballBall, FaRunning, FaSwimmer],
    Emoji: [FaSmile, FaLaughBeam, FaGrinHearts, FaSurprise, FaGrinStars, FaKissWinkHeart],
    Nature: [FaLeaf, FaTree, FaCloud, FaSun, FaWater, FaSnowflake],
  }
  
  const floatingIcons = [
    { icon: <FaDog />, top: '12%', left: '20%', color: 'text-cyan-300', animation: 'pulse' },
    { icon: <FaPizzaSlice />, top: '18%', left: '75%', color: 'text-pink-400', animation: 'pulse' },
    { icon: <FaFutbol />, top: '70%', left: '12%', color: 'text-blue-400', animation: 'pulse' },
    { icon: <FaLeaf />, top: '78%', left: '60%', color: 'text-purple-300', animation: 'pulse' },
    { icon: <FaSmile />, top: '70%', left: '83%', color: 'text-yellow-300', animation: 'pulse' },
    { icon: <FaTree />, top: '40%', left: '30%', color: 'text-green-300', animation: 'pulse' },
  ]
  
  export default function PlayPage() {
    const [player1, setPlayer1] = useState({ name: '', category: '' })
    const [player2, setPlayer2] = useState({ name: '', category: '' })
    const [playerWins, setPlayerWins] = useState({})
    const [currentTurn, setCurrentTurn] = useState('')
    const [board, setBoard] = useState(Array(9).fill(null))
    const [playerMoves, setPlayerMoves] = useState({ player1: [], player2: [] })
    const [hoverIndex, setHoverIndex] = useState(null)
    const navigate = useNavigate()
  
    useEffect(() => {
      const p1 = JSON.parse(localStorage.getItem('player1'))
      const p2 = JSON.parse(localStorage.getItem('player2'))
      const playerWins = JSON.parse(localStorage.getItem('playerWins'))
      setPlayer1(p1)
      setPlayer2(p2)
      setPlayerWins(playerWins)
      setCurrentTurn(p1?.name || '')

      if(!p1 || !p2) {
        navigate('/start')
      }
    }, [])
  
    const getRandomIcon = (category) => {
      const icons = allIcons[category]
      const Icon = icons[Math.floor(Math.random() * icons.length)]
      return <Icon />
    }
  
    const checkWin = (cells) => {
      const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]            // diagonals
      ]
      return winCombos.some(combo =>
        combo.every(index => cells.includes(index))
      )
    }
  
    const handleClick = (index) => {
      if (board[index]) {
        const errorMoveAudio = new Audio('/sound-effects/error-move.mp3')
        errorMoveAudio.play()
        return
      } 
      const player1Audio = new Audio('/sound-effects/player1-move.mp3')
      const player2Audio = new Audio('/sound-effects/player2-move.mp3')

      if (currentTurn === player1.name) {
        player1Audio.play()
      } else {
        player2Audio.play()
      }
  
      const playerKey = currentTurn === player1.name ? 'player1' : 'player2'
      const category = playerKey === 'player1' ? player1.category : player2.category
  
      const icon = getRandomIcon(category)
      const newBoard = [...board]
      newBoard[index] = { player: playerKey, icon }
  
      const newMoves = [...playerMoves[playerKey], index]
      if (newMoves.length > 3) newBoard[newMoves[0]] = null
      const trimmedMoves = newMoves.slice(-3)
  
      setBoard(newBoard)
      setPlayerMoves(prev => ({ ...prev, [playerKey]: trimmedMoves }))
  
      if (checkWin(trimmedMoves)) {
        const winner = currentTurn;
        const playerWins = JSON.parse(localStorage.getItem('playerWins'))
        playerWins[winner] = playerWins[winner] + 1
        localStorage.setItem('playerWins', JSON.stringify(playerWins))
        localStorage.setItem('winner', winner)
        const winAudio = new Audio('/sound-effects/win.mp3')
        winAudio.play()
        navigate('/result')
      }
  
      setCurrentTurn(currentTurn === player1.name ? player2.name : player1.name)
    }
  
    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-violet-600 to-blue-700 p-4 md:p-20 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-white overflow-hidden">
          
          {floatingIcons.map((item, i) => (
            <div
              key={i}
              className={`absolute ${item.color} text-3xl md:text-5xl lg:text-6xl animate-${item.animation} pointer-events-none select-none transition-transform duration-500`}
              style={{ top: item.top, left: item.left, animationDelay: `${i * 0.5}s` }}
              aria-hidden="true"
            >
              {item.icon}
            </div>
          ))}
    
          <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl shadow-xl w-full md:w-1/4 text-center border border-white/20 hover:scale-105 transition duration-300 space-y-6">
            <h2 className="text-2xl font-semibold mb-2">{player1.name || 'Player 1'}</h2>
            <p className="text-sm text-white/80 mb-3 tracking-wide uppercase">
              Selected Category: <span className="font-bold text-yellow-300">{player1.category}</span>
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {allIcons[player1.category]?.map((Icon, i) => (
                <Icon key={i} className="text-xl hover:scale-125 transition" title={Icon.displayName || 'Icon'} />
              ))}
            </div>
            <p className="text-md md:text-lg mt-2 bg-white/10 px-5 py-2 rounded-full border border-white/20 shadow-sm">
              Wins: <span className="font-bold text-yellow-300">{playerWins[player1.name]}</span>
            </p>
          </div>
    
          <div className="w-full md:w-2/4 flex flex-col items-center gap-6 px-14 py-6">
            <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
              {board.map((cell, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(i)}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className={`
                    aspect-square text-4xl rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center ring-1 ring-white/10
                    ${
                      board[i]
                        ? board[i].player === 'player1'
                          ? 'bg-red-500'
                          : 'bg-cyan-500'
                        : hoverIndex === i
                        ? currentTurn === player1.name
                          ? 'bg-red-300'
                          : 'bg-cyan-300'
                        : 'bg-white/20 hover:ring-2 hover:ring-yellow-200'
                    }
                  `}
                  title={`Cell ${i + 1}`}
                >
                  {cell?.icon || ''}
                </button>
              ))}
            </div>
            <p className="text-md md:text-lg mt-2 bg-white/10 px-5 py-2 rounded-full border border-white/20 shadow-sm">
              Current Turn: <span className="font-bold text-yellow-300">{currentTurn}</span>
            </p>
          </div>
    
          <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl shadow-xl w-full md:w-1/4 text-center border border-white/20 hover:scale-105 transition duration-300 space-y-6">
            <h2 className="text-2xl font-semibold mb-2">{player2.name || 'Player 2'}</h2>
            <p className="text-sm text-white/80 mb-3 tracking-wide uppercase">
              Selected Category: <span className="font-bold text-yellow-300">{player2.category}</span>
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {allIcons[player2.category]?.map((Icon, i) => (
                <Icon key={i} className="text-xl hover:scale-125 transition" title={Icon.displayName || 'Icon'} />
              ))}
            </div>
            <p className="text-md md:text-lg mt-2 bg-white/10 px-5 py-2 rounded-full border border-white/20 shadow-sm">
              Wins: <span className="font-bold text-yellow-300">{playerWins[player2.name]}</span>
            </p>
          </div>
        </div>
      )
    }