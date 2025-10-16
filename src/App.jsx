import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/main.scss'
import HabitPage from './pages/HabitPage/HabitPage'

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