import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useParams,
  Navigate, // ✨ 추가
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
            <Route index element={<Navigate to="detail" replace />} />
            <Route path="habit" element={<HabitPage />} />
            <Route path="focus" element={<FocusPage />} />
            <Route path="detail" element={<StudyDetailPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
