import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/global.scss'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage/HomePage'
import { HabitPage } from './pages/HabitPage/HabitPage'
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="habit" element={<HabitPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App