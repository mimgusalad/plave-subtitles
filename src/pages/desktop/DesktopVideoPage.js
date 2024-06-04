import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import SubtitleSettingDrawer from "../../components/Drawer";
import Modal from "../../components/Modal";
import Subtitles from "../../components/Subtitles";
// import { getBottom } from "../../utils/getBottom";
import { isMobile, isTablet } from "react-device-detect";
import Home from "../../components/HomeButton";
import { getSubtitles } from "../../utils/getSubtitles";

function YouTubePlayer() {
  usePageRotation("/watch");

  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  const [subtitleHashTable, setSubtitleHashTable] = useState({});
  const [type, setType] = useState(localStorage.getItem("type") || "b");
  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem("fontSize")) || isMobile ? 14 : 22
  );

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang") || "ko"
  );
  const [currentOffset, setOffset] = useState(
    Number(localStorage.getItem("offset")) || isMobile ? -10 : -100
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("videoId");

  /*동영상 크기 변수 */
  const [videoWidth, setVideoWidth] = useState(window.innerWidth * 0.8);
  const [videoHeight, setVideoHeight] = useState(
    (window.innerHeight * 0.8 * 9) / 16
  );

  /** 모달 창 변수 */
  const [isModalOpen, setIsModalOpen] = useState(
    localStorage.getItem("modal") === "false" ? false : true
  );

  // Resize video player based on window size
  const handleResize = () => {
    setVideoWidth((window.innerHeight * 16) / 9);
    setVideoHeight(window.innerHeight);
    if (window.innerWidth / window.innerHeight < 16 / 9) {
      setVideoWidth(window.innerWidth);
      setVideoHeight((window.innerWidth * 9) / 16);
    }
  };

  const handleConfirm = (selected) => {
    setIsModalOpen(false);
    localStorage.setItem("modal", "false");
    localStorage.setItem("type", selected);
  };

  const handleTypeChange = (selected) => {
    setType(selected);
    localStorage.setItem("type", selected);
  };

  const handleOffsetChange = (offset) => {
    setOffset(offset);
    localStorage.setItem("offset", offset);
  };

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    const selectedSubtitles = await fetchSubtitles(language);
    setSubtitleHashTable(selectedSubtitles);
  };

  const handleFontSizeChange = (fontSize) => {
    setFontSize(fontSize);
    localStorage.setItem("fontSize", fontSize);
  };

  useEffect(() => {
    const element = document.getElementsByClassName("subtitle-container")[0];
    element.style.bottom = window.innerHeight * 0.05 - currentOffset + "px";
  }, [currentOffset]);

  useEffect(() => {
    const elements = document.querySelectorAll(".subtitle-container");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.fontSize = `${fontSize}px`;
    }
  }, [fontSize]);

  // Fetch initial subtitles and set up event listeners
  useEffect(() => {
    const element = document.getElementsByClassName("subtitle-container")[0];
    element.style.bottom = window.innerHeight * 0.05 - currentOffset + "px";
    document.body.classList.add("background-transition");
    // Fetch initial subtitles
    fetchSubtitles(selectedLanguage).then(setSubtitleHashTable);

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial value
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Cache object to store fetched subtitles
  const subtitleCache = useRef({});

  // Function to fetch and cache subtitles based on selected language
  const fetchSubtitles = async (language) => {
    if (subtitleCache.current[language]) {
      return subtitleCache.current[language];
    } else {
      let selectedSubtitles;
      switch (language) {
        case "ko":
          selectedSubtitles = await getSubtitles(videoId, "korean");
          break;
        case "en":
          selectedSubtitles = await getSubtitles(videoId, "english");
          break;
        case "ja":
          selectedSubtitles = await getSubtitles(videoId, "japanese");
          break;
        default:
          selectedSubtitles = await getSubtitles(videoId, "korean");
      }
      subtitleCache.current[language] = selectedSubtitles;
      return selectedSubtitles;
    }
  };

  /* 동영상 시간 구하기 */
  useEffect(() => {
    if (player) {
      const interval = setInterval(() => {
        setCurrentTime(Math.floor(player.getCurrentTime()));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [player]);

  /* 동영상 현재 시간에 따른 자막 송출 */
  useEffect(() => {
    if (subtitleHashTable && currentTime in subtitleHashTable) {
      const subtitleText = subtitleHashTable[currentTime].text;
      // Split by speaker labels and keep the labels
      const parsedSubtitles = subtitleText.split(/(?=\[.*?\])/).filter(Boolean);
      setSubtitles(parsedSubtitles);
    }
  }, [currentTime, subtitleHashTable]);

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const opts = {
    width: videoWidth,
    height: videoHeight,
    playerVars: {
      fs: 0, // 전체화면 버튼 제거
      rel: 0, // 동영상이 재생된 계정의 다른 동영상을 추천하는 기능
      showInfo: 0, // 동영상 멈췄을때 관련 영상 안보이게 하는 parameter
    },
  };
  const optsMobile = {
    width: (window.innerWidth * 16) / 9,
    height: window.innerWidth,
    playerVars: {
      fs: 0, // 전체화면 버튼 제거
      rel: 0, // 동영상이 재생된 계정의 다른 동영상을 추천하는 기능
      showInfo: 0, // 동영상 멈췄을때 관련 영상 안보이게 하는 parameter
    },
  };
  const optsTablet = {
    width: window.innerWidth,
    height: (window.innerWidth * 9) / 16,
    playerVars: {
      fs: 0, // 전체화면 버튼 제거
      rel: 0, // 동영상이 재생된 계정의 다른 동영상을 추천하는 기능
      showInfo: 0, // 동영상 멈췄을때 관련 영상 안보이게 하는 parameter
    },
  };

  return (
    <div
      className={`${isMobile && !isTablet ? "mobile" : "desktop"}-video-page`}
    >
      {isModalOpen && (
        <Modal handleConfirm={handleConfirm} lang={selectedLanguage} />
      )}

      <div
        className={`${
          isMobile && !isTablet ? "mobile" : "desktop"
        }-video-container`}
      >
        <Home />
        <YouTube
          className="youtube-player"
          videoId={videoId}
          opts={isMobile ? (isTablet ? optsTablet : optsMobile) : opts}
          onReady={onReady}
          onEnd={() => player.stopVideo()} // not really needed
        />
        <div className="subtitle-container">
          <Subtitles subtitles={subtitles} type={type} />
        </div>
        <SubtitleSettingDrawer
          lang={selectedLanguage}
          handleTypeChange={handleTypeChange}
          handleLanguageChange={handleLanguageChange}
          currentOffset={currentOffset}
          handleOffsetChange={handleOffsetChange}
          handleFontSizeChange={handleFontSizeChange}
          fontSize={fontSize}
        />
      </div>
    </div>
  );
}

export default YouTubePlayer;

function usePageRotation(pathToRotate) {
  const location = useLocation();

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (location.pathname === pathToRotate && isMobile && !isTablet) {
      // Apply rotation
      htmlElement.style.transform = "rotate(-90deg)";
      htmlElement.style.transformOrigin = "left top";
      htmlElement.style.width = "100dvh";
      htmlElement.style.height = "100dvw";
      htmlElement.style.overflowX = "hidden";
      htmlElement.style.position = "absolute";
      htmlElement.style.top = "100%";
      htmlElement.style.left = "0";
      document.body.style.width = "100vh";
      document.body.style.height = "100vw";
    }
  }, [location, pathToRotate]);
}
