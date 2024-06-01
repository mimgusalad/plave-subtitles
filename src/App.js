import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./css/desktop.css";
import "./css/mobile-landscape.css";
import "./css/mobile.css";
import { images } from "./locale";
import AboutPage from "./pages/AboutPage";
import DesktopHomePage from "./pages/Desktop/DesktopHomePage";
import YouTubePlayer from "./pages/Desktop/DesktopVideoPage";
import MobileHomePage from "./pages/Mobile/MobileHomePage";
import MobileYoutubePlayer from "./pages/Mobile/MobileVideoPage";
import "./style.css";

function App() {
  const [imageCache, setImageCache] = useState({});
  // 이미지 프리로딩
  useEffect(() => {
    const cache = {};
    images.forEach((image) => {
      const img = new Image();
      img.src = process.env.PUBLIC_URL + "/img/profile/" + image;
      cache[image] = img;
    });
    images.forEach((image) => {
      const img = new Image();
      img.src = process.env.PUBLIC_URL + "/img/symbol/" + image;
      cache[image] = img;
    });

    images.forEach((image) => {
      const img = new Image();
      img.src =
        process.env.PUBLIC_URL +
        "/img/tail/" +
        image.split(".")[0] +
        "_tail.png";
      cache[image] = img;
    });
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
            <Route path="/watch" element={<MobileYoutubePlayer />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </MobileView>
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
