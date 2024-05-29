import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import SubtitleTypeModal from "../../components/Modal";
import NavBar from "../../components/NavBar";
import Subtitles from "../../components/Subtitles";
import { getSubtitles } from "../../utils/getSubtitles";

function YouTubePlayer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("videoId");
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  const [subtitleHashTable, setSubtitleHashTable] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang") || "ko"
  );

  /*동영상 크기 변수 */
  const [videoWidth, setVideoWidth] = useState(window.innerWidth);
  const [videoHeight, setVideoHeight] = useState((window.innerWidth * 9) / 16);

  /** 모달 창 변수 */
  const [isModalOpen, setIsModalOpen] = useState(
    localStorage.getItem("modal") === "false" ? false : true
  );

  const handleConfirm = () => {
    localStorage.setItem("modal", "false");
    setIsModalOpen(false);
    // refresh page to apply new subtitle type
    window.location.reload();
  };

  const handleModalClose = () => {
    localStorage.setItem("modal", "false");
    setIsModalOpen(false);
  };

  const handleResize = () => {
    if (window.innerWidth / window.innerHeight < 1.5) {
      setVideoWidth(window.innerWidth);
      setVideoHeight((window.innerWidth * 9) / 16);
    } else {
      setVideoWidth(window.innerWidth * 0.72);
      setVideoHeight(((window.innerWidth * 9) / 16) * 0.72);
    }
  };

  useEffect(() => {
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
          selectedSubtitles = await getSubtitles(videoId, "korean"); // Default to Korean subtitles
      }
      subtitleCache.current[language] = selectedSubtitles;
      return selectedSubtitles;
    }
  };

  /** 배경 이미지 transition 넣고 자막 받아오기 */
  useEffect(() => {
    document.body.style.backgroundImage = "url('/img/bg.png')";
    document.body.classList.add("background-transition");
    setTimeout(() => {
      document.body.classList.add("background-transition");
    }, 10);

    // Fetch initial subtitles
    fetchSubtitles(selectedLanguage).then(setSubtitleHashTable);
  }, []);

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

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    const selectedSubtitles = await fetchSubtitles(language);
    setSubtitleHashTable(selectedSubtitles);
  };

  const subtitleType = localStorage.getItem("subtitleType") || 0;
  return (
    <div>
      {isModalOpen && (
        <SubtitleTypeModal
          handleModalClose={handleModalClose}
          handleConfirm={handleConfirm}
        />
      )}
      <NavBar
        handleLanguageChange={handleLanguageChange}
        selectedLanguage={selectedLanguage}
      />
      <div className={`video-container`}>
        {subtitleType === "1" ? (
          <YouTube
            videoId={videoId}
            onReady={onReady}
            opts={{
              width: (window.innerHeight * 16) / 9,
              height: window.innerHeight * 0.95,
            }}
          />
        ) : (
          <YouTube
            videoId={videoId}
            onReady={onReady}
            opts={{ width: videoWidth, height: videoHeight }}
          />
        )}
        <div
          className={
            subtitleType === "0" ? "subtitle-container" : "subtitle-container-2"
          }
        >
          <Subtitles subtitles={subtitles} />
        </div>
      </div>
    </div>
  );
}

export default YouTubePlayer;
