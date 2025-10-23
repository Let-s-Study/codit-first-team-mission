import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage/HomePage'
import { HabitPage } from './pages/HabitPage/HabitPage'
import { FocusPage } from './pages/FocusPage/FocusPage'
import { CreateStudyPage } from './pages/CreateStudy/CreateStudyPage'
import { StudyDetailPage } from './pages/StudyDetail/StudyDetailPage'
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
            <Route path="habit" element={<HabitPage />}/>
          <Route path="create" element={<CreateStudyPage />} />
          <Route path="focus" element={<FocusPage />} />
          <Route path="detail" element={<StudyDetailPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;