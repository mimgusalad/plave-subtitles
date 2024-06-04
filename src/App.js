import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { BrowserView, MobileView, TabletView } from "react-device-detect";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./css/desktop.css";
import "./css/mobile.css";
import "./css/tablet.css";
import AboutPage from "./pages/AboutPage";
import DesktopHomePage from "./pages/desktop/DesktopHomePage";
import YouTubePlayer from "./pages/desktop/DesktopVideoPage";
import MobileHomePage from "./pages/mobile/MobileHomePage";
import "./style.css";
import preloadImages from "./utils/preloadImages";

function App() {
  useEffect(() => {
    const setScreenSize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setScreenSize();
    preloadImages();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle />
        <BrowserView>
          <Routes>
            <Route path="/" element={<DesktopHomePage />} />
            <Route path="/watch" element={<YouTubePlayer />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </BrowserView>
        <TabletView>
          <Routes>
            <Route path="/" element={<DesktopHomePage />} />
            <Route path="/watch" element={<YouTubePlayer />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </TabletView>
        <MobileView>
          <Routes>
            <Route path="/" element={<MobileHomePage />} />
            <Route path="/watch" element={<YouTubePlayer />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </MobileView>
      </div>
    </ThemeProvider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
:root{
  --vh: 100%;
}
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  body {
    font-family: 'Roboto', 'Yu Gothic UI', 'Pretendard-Regular', sans-serif;
  }
`;

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Yu Gothic UI, Pretendard-Regular, sans-serif",
  },
});
