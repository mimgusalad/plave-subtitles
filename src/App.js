import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { BrowserView } from "react-device-detect";
import { useMediaQuery } from "react-responsive";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./css/desktop.css";
import "./css/mobile-landscape.css";
import "./css/mobile.css";
import { images } from "./locale";
import AboutPage from "./pages/AboutPage";
import DesktopHomePage from "./pages/Desktop/DesktopHomePage";
import YouTubePlayer from "./pages/Desktop/YouTubePlayer";
// import MobileHomePage from "./pages/mobile/MobileHomePage";
// import MobileYoutubePlayer from "./pages/mobile/MobileVideoPage";
import "./style.css";

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 950px)" });
  useEffect(() => {
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
        {/* <MobileView>
          <Routes>
            <Route path="/" element={<MobileHomePage />} />
            <Route path="/watch" element={<MobileYoutubePlayer />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </MobileView> */}
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

const preloadImages = () => {
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
      process.env.PUBLIC_URL + "/img/tail/" + image.split(".")[0] + "_tail.png";
    cache[image] = img;
  });
};
