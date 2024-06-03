import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import SubtitleSettingDrawer from "../../components/Drawer";
import Modal from "../../components/Modal";
import Subtitles from "../../components/Subtitles";
// import { getBottom } from "../../utils/getBottom";
import { getSubtitles } from "../../utils/getSubtitles";

function YouTubePlayer() {
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  const [type, setType] = useState(localStorage.getItem("type") || "b");
  const [subtitleHashTable, setSubtitleHashTable] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang") || "ko"
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("videoId");

  // const isTablet = useMediaQuery({
  //   query: "(min-width: 768px) and (max-width: 1024px)",
  // });

  /*동영상 크기 변수 */
  const [videoWidth, setVideoWidth] = useState(window.innerWidth * 0.8);
  const [videoHeight, setVideoHeight] = useState(
    (window.innerHeight * 0.8 * 9) / 16
  );

  /** 모달 창 변수 */
  const [isModalOpen, setIsModalOpen] = useState(
    localStorage.getItem("modal") === "false" ? false : true
  );

  const handleConfirm = (selected) => {
    setIsModalOpen(false);
    localStorage.setItem("modal", "false");
    localStorage.setItem("type", selected);
  };

  const handleTypeChange = (selected) => {
    setType(selected);
  };

  // const handleLanguageChange = (language) => {
  //   localStorage.setItem("lang", language);
  //   setSelectedLanguage(language);
  // };

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    const selectedSubtitles = await fetchSubtitles(language);
    setSubtitleHashTable(selectedSubtitles);
  };

  // Resize video player based on window size
  const handleResize = () => {
    setVideoWidth((window.innerHeight * 16) / 9);
    setVideoHeight(window.innerHeight);
    if (window.innerWidth / window.innerHeight < 16 / 9) {
      setVideoWidth(window.innerWidth);
      setVideoHeight((window.innerWidth * 9) / 16);
    }
    // let subtitleContainer =
    //   document.getElementsByClassName("subtitle-container")[0];
    // subtitleContainer.style.top = getBottom() - 200 + "px";
  };

  // Fetch initial subtitles and set up event listeners
  useEffect(() => {
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

  return (
    <div>
      {isModalOpen && (
        <Modal handleConfirm={handleConfirm} lang={selectedLanguage} />
      )}
      <div className="desktop-video-container">
        <YouTube
          className="youtube-player"
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onEnd={() => player.stopVideo()} // not really needed
        />
        <div className="subtitle-container">
          <Subtitles subtitles={subtitles} type={type} />
        </div>
        <SubtitleSettingDrawer
          handleTypeChange={handleTypeChange}
          handleLanguageChange={handleLanguageChange}
        />
      </div>
    </div>
  );
}

export default YouTubePlayer;

const Home = () => {
  return (
    <div className="desktop-home-link" style={{ zIndex: "0" }}>
      <Link
        to="/"
        style={{
          fontSize: "1.7em",
          textDecoration: "none",
          color: "snow",
          fontWeight: "bold",
          position: "absolute",
          left: "20px",
        }}
      >
        {"HOME"}
      </Link>
    </div>
  );
};
