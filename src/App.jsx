import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/global.scss'
import { Layout } from './components/layout/Layout'
import { CreateStudyPage } from './pages/CreateStudy/CreateStudyPage'
import { HomePage } from './pages/HomePage/HomePage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HabitPage />}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App