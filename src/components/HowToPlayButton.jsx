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
      className="z-30 flex items-center justify-center w-full gap-2 text-black font-semibold"
    >
      <div className='flex items-center gap-2 bg-gradient-to-r from-sky-400 to-blue-500 m-4 md:mt-8 px-4 py-2 rounded-full shadow-lg hover:scale-105 transition duration-300'>
        <FaQuestionCircle className="text-lg" />
        How to Play?
      </div>
    </button>
  )
}

export default HowToPlayButton