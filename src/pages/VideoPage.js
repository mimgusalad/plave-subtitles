import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
import { useEffect, useRef, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import DisplaySubtitles from "../components/DisplaySubtitles";
import SubtitleSettingDrawer from "../components/Drawer";
import Form from "../components/Form";
import GuideTooltip from "../components/GuideTooltip";
import Home from "../components/HomeButton";
import Modal from "../components/Modal";
import { leftHandRotation, rightHandRotation } from "../utils/changeRotation";
import { getSubtitles } from "../utils/getSubtitles";

function YouTubePlayer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("videoId");

  /** 자막 불러올때 사용하는 변수 */
  const [subtitleHashTable, setSubtitleHashTable] = useState({});
  const [subtitles, setSubtitles] = useState([]);

  /** 자막 조작하는 변수 */
  const [type, setType] = useState(localStorage.getItem("type") || "b"); // 자막바 타입 변수
  const [fontSize, setFontSize] = useState(
    Number(sessionStorage.getItem("fontSize"))
  ); // 폰트 사이즈 변수
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang")
  ); // 선택된 언어 변수
  const [currentOffset, setOffset] = useState(
    Number(sessionStorage.getItem("offset"))
  ); // 자막 위치 변수

  /** 동영상 관련 변수 */
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState(null);
  // 동영상 크기 변수
  const [videoWidth, setVideoWidth] = useState(window.innerWidth * 0.8);
  const [videoHeight, setVideoHeight] = useState(
    (window.innerHeight * 0.8 * 9) / 16
  );

  // 자막바 디자인 선택하는 모달 창 변수
  const [isModalOpen, setIsModalOpen] = useState(
    sessionStorage.getItem("modal") === "false" ? false : true
  );

  const [isGuideOpen, setIsGuideOpen] = useState(
    localStorage.getItem("guide") === "false" ? false : true
  );

  const [rotate, setRotate] = useState(sessionStorage.getItem("rotate") || "0"); // righthand: 0, lefthand: 1

  // Resize video player based on window size
  const handleResize = () => {
    setVideoWidth((window.innerHeight * 16) / 9);
    setVideoHeight(window.innerHeight);
    if (window.innerWidth / window.innerHeight < 16 / 9) {
      setVideoWidth(window.innerWidth);
      setVideoHeight((window.innerWidth * 9) / 16);
    }
  };

  const handleGuideClose = () => {
    setIsGuideOpen(false);
    localStorage.setItem("guide", false);
  };

  const handleModalConfirm = (selected) => {
    setIsModalOpen(false);
    sessionStorage.setItem("modal", false);
    localStorage.setItem("type", selected);
    setType(selected);
  };

  const handleTypeChange = (selected) => {
    setType(selected);
    localStorage.setItem("type", selected);
  };

  const handleOffsetChange = (offset) => {
    setOffset(offset);
    sessionStorage.setItem("offset", offset);
  };

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    const selectedSubtitles = await fetchSubtitles(language);
    setSubtitleHashTable(selectedSubtitles);
  };

  const handleFontSizeChange = (fontSize) => {
    setFontSize(fontSize);
    sessionStorage.setItem("fontSize", fontSize);
  };

  // 모바일 가로화면 방향
  const setRotateDirection = () => {
    if (rotate === "1") {
      leftHandRotation();
    } else {
      rightHandRotation();
    }
  };

  const handleRotate = () => {
    if (rotate === "0") {
      setRotate("1");
      leftHandRotation();
      sessionStorage.setItem("rotate", "1");
    } else {
      setRotate("0");
      rightHandRotation();
      sessionStorage.setItem("rotate", "0");
    }
  };

  // Set subtitle position based on current offset
  useEffect(() => {
    const element = document.getElementsByClassName("subtitle-container")[0];
    element.style.bottom = window.innerHeight * 0.05 - currentOffset + "px";
  }, [currentOffset]);

  // Set subtitle font size based on current font size
  useEffect(() => {
    const elements = document.querySelectorAll(".subtitle-container");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.fontSize = `${fontSize}px`;
    }
  }, [fontSize]);

  useEffect(() => {
    if (isMobile && !isTablet) setRotateDirection();
  }, []);

  // Fetch initial subtitles and set up event listeners
  useEffect(() => {
    const element = document.getElementsByClassName("subtitle-container")[0];
    element.style.bottom = window.innerHeight * 0.05 - currentOffset + "px";

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

  return (
    <div
      className={`${
        isMobile ? (isTablet ? "tablet" : "mobile") : "desktop"
      }-video-page`}
    >
      {isModalOpen && (
        <Modal handleConfirm={handleModalConfirm} lang={selectedLanguage} />
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
          loading="lazy"
          opts={
            isMobile
              ? isTablet
                ? optsTablet
                : optsMobile
              : optsDesktop(videoWidth, videoHeight)
          }
          onReady={onReady}
          onEnd={() => player.stopVideo()} // not really needed
        />
        <div className="subtitle-container">
          <DisplaySubtitles subtitles={subtitles} type={type} />
        </div>
        <Form
          rotation={rotate}
          lang={selectedLanguage}
          videoId={videoId}
          timecode={currentTime}
        />
        <SubtitleSettingDrawer
          lang={selectedLanguage}
          handleTypeChange={handleTypeChange}
          handleLanguageChange={handleLanguageChange}
          currentOffset={currentOffset}
          handleOffsetChange={handleOffsetChange}
          handleFontSizeChange={handleFontSizeChange}
          fontSize={fontSize}
        />
        {isMobile && !isTablet && (
          <span id="rotate-button-video" onClick={handleRotate}>
            <ScreenRotationIcon
              style={{ color: "snow", fontSize: "1.5em", cursor: "pointer" }}
            />
          </span>
        )}
        {isGuideOpen && (
          <GuideTooltip
            lang={selectedLanguage}
            handleGuideClose={handleGuideClose}
          />
        )}
      </div>
    </div>
  );
}

export default YouTubePlayer;

const baseOpts = {
  playerVars: {
    fs: 0, // 전체화면 버튼 제거
    rel: 0, // 동영상이 재생된 계정의 다른 동영상을 추천하는 기능
    showInfo: 0, // 동영상 멈췄을때 관련 영상 안보이게 하는 parameter
  },
};

const optsDesktop = (videoWidth, videoHeight) => ({
  ...baseOpts,
  width: videoWidth,
  height: videoHeight,
});

const optsMobile = {
  ...baseOpts,
  width: (window.innerWidth * 16) / 9,
  height: window.innerWidth,
};
const optsTablet = {
  ...baseOpts,
  width: window.innerWidth,
  height: (window.innerWidth * 9) / 16,
};
