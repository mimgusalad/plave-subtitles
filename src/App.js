import { CircularProgress } from "@mui/material";
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
import PreloadImages from "./utils/preloadImages";
lazy(() => import("./css/desktop.css"));
lazy(() => import("./css/style.css"));
lazy(() => import("./css/tablet.css"));
lazy(() => import("./css/mobile.css"));

const AboutPage = lazy(() => import("./pages/AboutPage"));
const DesktopHomePage = lazy(() => import("./pages/DesktopHomePage"));
const MobileHomePage = lazy(() => import("./pages/MobileHomePage"));
const YouTubePlayer = lazy(() => import("./pages/VideoPage"));

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const sheetID = "17WmAumFfDfk7PGuipE5KJiYmVEBs8MarhrRfSaTUc0Y";
  const tabName = "Database";
  localStorage.setItem("lang", "ko");
  sessionStorage.setItem("fontSize", isMobile && !isTablet ? 14 : 18);
  sessionStorage.setItem("offset", isMobile ? (!isTablet ? -5 : -30) : -50);
  localStorage.setItem("modal", "true");
  localStorage.setItem("type", "b");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://opensheet.elk.sh/" + sheetID + "/" + tabName
        );

        const sortedData = response.data.sort(
          (a, b) => new Date(b.Date) - new Date(a.Date)
        );
        setData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    setScreenSize();
    fetchData();
  }, []);

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {loading ? (
          <div style={style}>
            <CircularProgress sx={{ color: "snow" }} />
          </div>
        ) : (
          <>
            <PreloadImages videoData={data} />
            <GlobalStyle />
            <BrowserView>
              <Suspense>
                <Routes>
                  <Route
                    path="/"
                    element={<DesktopHomePage videoData={data} />}
                  />
                  <Route path="/watch" element={<YouTubePlayer />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </Suspense>
            </BrowserView>
            <MobileView>
              <Suspense>
                <Routes>
                  <Route
                    path="/"
                    element={<MobileHomePage videoData={data} />}
                  />
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
                  <Route
                    path="/"
                    element={<DesktopHomePage videoData={data} />}
                  />
                  <Route path="/watch" element={<YouTubePlayer />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </Suspense>
            </TabletView>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('/font/Pretendard-Regular.subset.woff2') format('woff2'), url('/font/Pretendard-Regular.subset.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    unicode-range: U+1100-11FF, U+3130-318F, U+AC00-D7AF, U+3200-32FF, U+FF00-FFEF;
  }
  
  @font-face {
    font-family: 'Yu Gothic UI';
    src: local('Yu Gothic UI');
    font-weight: 400;
    font-style: normal;
    unicode-range: U+3040-309F, U+30A0-30FF, U+31F0-31FF, U+4E00-9FFF, U+FF00-FFEF;
  }
  

  * {
    font-family: 'Roboto', 'Yu Gothic UI', 'Pretendard-Regular', sans-serif !important;
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
