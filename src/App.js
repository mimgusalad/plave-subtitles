import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import {
  BrowserView,
  MobileView,
  TabletView,
  isMobile,
  isTablet,
} from "react-device-detect";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./css/desktop.css";
import "./css/mobile.css";
import "./css/style.css";
import "./css/tablet.css";
import AboutPage from "./pages/AboutPage";
import DesktopHomePage from "./pages/DesktopHomePage";
import MobileHomePage from "./pages/MobileHomePage";
import YouTubePlayer from "./pages/VideoPage";
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
        <MobileView>
          <Routes>
            <Route path="/" element={<MobileHomePage />} />
            {isMobile && !isTablet && (
              <Route path="/watch" element={<YouTubePlayer />} />
            )}
            {isMobile && !isTablet && (
              <Route path="/about" element={<AboutPage />} />
            )}
          </Routes>
        </MobileView>
        <TabletView>
          <Routes>
            <Route path="/" element={<DesktopHomePage />} />
            <Route path="/watch" element={<YouTubePlayer />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </TabletView>
      </div>
    </ThemeProvider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
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
