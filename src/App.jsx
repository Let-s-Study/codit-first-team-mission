import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useParams,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage/HomePage";
import { HabitPage } from "./pages/HabitPage/HabitPage";
import { FocusPage } from "./pages/FocusPage/FocusPage";
import { CreateStudyPage } from "./pages/CreateStudy/CreateStudyPage";
import { StudyDetailPage } from "./pages/StudyDetail/StudyDetailPage";
import { AuthProvider } from "./context/AuthContext";

function StudySpecificLayout() {
  const { studyId } = useParams();
  if (!studyId) {
    // studyId가 유효하지 않은경우 어떻게 할지
    return <div> 잘못된 접근입니다 </div>;
  }
  return (
    <AuthProvider studyId={studyId}>
      <Outlet />
    </AuthProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="create" element={<CreateStudyPage />} />
          <Route path="study/:studyId" element={<StudySpecificLayout />}>
            <Route path="habit" element={<HabitPage />} />
            <Route path="focus" element={<FocusPage />} />
            <Route path="detail" element={<StudyDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
