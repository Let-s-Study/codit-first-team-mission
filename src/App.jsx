import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global.scss";
import { Layout } from "./components/layout/Layout";
import FocusPage from "./page/focuspage/focuspage";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route>
            <FocusPage />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
