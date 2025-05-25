import React from 'react'
import { FaHeart, FaGithub, FaGlobe } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full bg-white/10 backdrop-blur-sm px-6 py-5 text-white text-sm border-t border-white/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

        <div className="text-white font-medium leading-relaxed">
          Designed and Developed with &hearts; by <br className="md:hidden" />
          <span className="font-semibold text-yellow-300">Priyanshu Chaurasiya</span>
        </div>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          <a
            href="https://hey-sainty.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-yellow-300 transition-all duration-200"
            aria-label="Visit Hey Sainty"
          >
            <FaGlobe className="text-base" />
            <span>Hey Sainty</span>
          </a>
          <a
            href="https://github.com/iamsainty"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-yellow-300 transition-all duration-200"
            aria-label="Visit GitHub profile"
          >
            <FaGithub className="text-base" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
