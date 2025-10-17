import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/global.scss'
import { Layout } from './components/layout/Layout'
import { CreateStudyPage } from './pages/CreateStudy/CreateStudyPage'
import { HomePage } from './pages/HomePage/HomePage'
function App() {
  return (
    <Router>
        <Routes>
        <Route element={<Layout/>}>
        <Route path="/" element={<HomePage />} />
        <Route path="create" element={<CreateStudyPage/>} />
        <Route path="detail" element={<StudyDetailPage/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
