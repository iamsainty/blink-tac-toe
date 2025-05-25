import React from 'react'
import { FaQuestionCircle } from 'react-icons/fa'

const HowToPlayButton = ({ setShowGuide }) => {
  const handleShowGuide = () => {
    const audio = new Audio('/sound-effects/click.mp3')
    audio.play()
    setShowGuide(true)
  }

  return (
    <button
      onClick={handleShowGuide}
      className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-gradient-to-r from-sky-400 to-blue-500 text-black font-semibold px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <FaQuestionCircle className="text-lg" />
      How to Play?
    </button>
  )
}

export default HowToPlayButton