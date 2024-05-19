import "./App.css";
import "./style.css";
import { createGlobalStyle } from "styled-components";
import HomePage from "./pages/HomePage";
import YouTubePlayer from "./pages/VideoPage";
import { Routes, Route } from "react-router-dom";
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
  }
`;
function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header"></header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch" element={<YouTubePlayer />} />
      </Routes>
    </div>
  );
}

export default App;
