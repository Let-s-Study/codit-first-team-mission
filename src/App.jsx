import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global.scss";
import { Layout } from "./components/layout/Layout";
import { CreateStudyPage } from "./pages/CreateStudy/CreateStudyPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { FocusPage } from "./pages/FocusPage/FocusPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="create" element={<CreateStudyPage />} />
          <Route path="focus" element={<FocusPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
