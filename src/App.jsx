import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import StartGame from './pages/StartGame'
import PlayGame from './pages/PlayGame'
import ResultDisplay from './pages/ResultDisplay'
import GuideToPlay from './components/GuideToPlay'
import { useState } from 'react'
import HowToPlayButton from './components/HowToPlayButton'
import Footer from './components/Footer'

function App() {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className='min-h-screen bg-gradient-to-br from-violet-600 to-blue-700'>

    <Router>
      {!showGuide && <HowToPlayButton setShowGuide={setShowGuide} />}
      {showGuide && <GuideToPlay setShowGuide={setShowGuide} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<StartGame />} />
        <Route path="/play" element={<PlayGame />} />
        <Route path="/result" element={<ResultDisplay />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  )
}

export default App
