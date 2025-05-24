import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import StartGame from './pages/StartGame'
import PlayGame from './pages/PlayGame'
import ResultDisplay from './pages/ResultDisplay'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<StartGame />} />
        <Route path="/play" element={<PlayGame />} />
        <Route path="/result" element={<ResultDisplay />} />
      </Routes>
    </Router>
  )
}

export default App
