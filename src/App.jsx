import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global.scss";
import { Layout } from "./components/layout/Layout";
import { AttentionPage } from "./page/attentionpage/attentionpage";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
