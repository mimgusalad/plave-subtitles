import { BrowserView, MobileView } from "react-device-detect";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./css/mobile-landscape.css";
import "./css/mobile.css";
import AboutPage from "./pages/AboutPage";
import DesktopHomePage from "./pages/Desktop/DesktopHomePage";
import YouTubePlayer from "./pages/Desktop/DesktopVideoPage";
import MobileHomePage from "./pages/Mobile/MobileHomePage";
import MobileYoutubePlayer from "./pages/Mobile/MobileVideoPage";
import "./style.css";

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
      <BrowserView>
        <Routes>
          <Route path="/" element={<DesktopHomePage />} />
          <Route path="/watch" element={<YouTubePlayer />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path="/" element={<MobileHomePage />} />
          <Route path="/watch" element={<MobileYoutubePlayer />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </MobileView>
    </div>
  );
}

export default App;
