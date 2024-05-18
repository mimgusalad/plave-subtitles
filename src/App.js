import "./App.css";
import "./style.css";
import Home from "./pages/Home";
import YouTubePlayer from "./pages/VideoPage";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          HOME
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<YouTubePlayer />} />
      </Routes>
    </div>
  );
}

export default App;
