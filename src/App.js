import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserView,
  MobileView,
  TabletView,
  isMobile,
  isTablet,
} from "react-device-detect";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./css/font.css";
lazy(() => import("./css/desktop.css"));
lazy(() => import("./css/style.css"));
lazy(() => import("./css/tablet.css"));
lazy(() => import("./css/mobile.css"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const DesktopHomePage = lazy(() => import("./pages/DesktopHomePage"));
const MobileHomePage = lazy(() => import("./pages/MobileHomePage"));
const YouTubePlayer = lazy(() => import("./pages/VideoPage"));

function App() {
  const [videoData, setVideoData] = useState([]);
  localStorage.setItem("lang", "ko");
  sessionStorage.setItem("fontSize", isMobile && !isTablet ? 16 : 26);
  sessionStorage.setItem("offset", isMobile && isTablet ? -10 : -100);
  localStorage.setItem("modal", "true");
  sessionStorage.setItem("type", "b");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://mimgusalad.github.io/plave/img/data.json")
        .then((res) => {
          setVideoData(res.data.info);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    setScreenSize();
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <preloadImages videoData={videoData} />
        <GlobalStyle />
        <BrowserView>
          <Suspense>
            <Routes>
              <Route
                path="/"
                element={<DesktopHomePage videoData={videoData} />}
              />
              <Route path="/watch" element={<YouTubePlayer />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Suspense>
        </BrowserView>
        <MobileView>
          <Suspense>
            <Routes>
              <Route path="/" element={<MobileHomePage />} />
              {isMobile && !isTablet && (
                <Route path="/watch" element={<YouTubePlayer />} />
              )}
              {isMobile && !isTablet && (
                <Route path="/about" element={<AboutPage />} />
              )}
            </Routes>
          </Suspense>
        </MobileView>
        <TabletView>
          <Suspense>
            <Routes>
              <Route path="/" element={<DesktopHomePage />} />
              <Route path="/watch" element={<YouTubePlayer />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Suspense>
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

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
