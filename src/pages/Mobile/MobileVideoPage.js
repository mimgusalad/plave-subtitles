import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import MobileNavBar from "../../MobileComponents/MobileNavBar";
import Subtitles from "../../components/Subtitles";
import { getSubtitles } from "../../utils/getSubtitles";

function MobileYoutubePlayer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const videoId = searchParams.get("videoId");
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  const [subtitleHashTable, setSubtitleHashTable] = useState({});
  const selectedLanguage = localStorage.getItem("lang") || "ko";

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

  return (
    <>
      <div
        className={`mobile-video-container${
          isPortrait ? "-portrait" : "-landscape"
        }`}
      >
        {isPortrait ? (
          <YouTube
            videoId={videoId}
            onReady={onReady}
            opts={{
              width: window.innerWidth,
              height: (window.innerWidth * 9) / 16,
            }}
          />
        ) : (
          <>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ArrowBackIosIcon style={ArrowStyle} />
            </Link>
            <YouTube
              videoId={videoId}
              onReady={onReady}
              opts={{
                width: (window.innerHeight * 16) / 9,
                height: window.innerHeight,
              }}
            />
          </>
        )}
        <div
          className={`mobile-subtitle-container${
            isPortrait ? "-portrait" : "-landscape"
          }`}
        >
          <span>
            <Subtitles subtitles={subtitles} />
          </span>
        </div>
      </div>
      <div
        className={`mobile-nav-bar${isPortrait ? "-portrait" : "-landscape"}`}
      >
        <MobileNavBar selectedLanguage={selectedLanguage} />
      </div>
    </>
  );
}

export default MobileYoutubePlayer;

const ArrowStyle = {
  color: "white",
  position: "absolute",
  top: "20px",
  left: "20px",
};
