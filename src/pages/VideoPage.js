import "bootstrap/dist/css/bootstrap.min.css";
import YouTube from "react-youtube";
import { useState, useEffect, useRef } from "react";
import { getSubtitles } from "../utils/getSubtitles";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Subtitles from "../components/Subtitles";
import LanguageSetting from "../components/LanguageSetting";
import NavBar from "../components/NavBar";
import zIndex from "@mui/material/styles/zIndex";

function YouTubePlayer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("videoId");
  const [currentTime, setCurrentTime] = useState(0);
  const [player, setPlayer] = useState(null);
  const [subtitleHashTable, setSubtitleHashTable] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang") || "ko"
  );
  const [subtitles, setSubtitles] = useState([]);
  const width = window.innerWidth * 0.7;
  const height = (width * 9) / 16;

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

  useEffect(() => {
    document.body.style.backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 10)), url('/img/bg.png')";
    // Fetch initial subtitles
    fetchSubtitles(selectedLanguage).then(setSubtitleHashTable);
  }, []);

  useEffect(() => {
    if (player) {
      // Update current time every 100ms
      const interval = setInterval(() => {
        setCurrentTime(Math.floor(player.getCurrentTime()));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [player]);

  useEffect(() => {
    // Update subtitle based on current time
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

  const navStyle = {
    backgroundColor: "black",
    opacity: "0.7",
    zIndex: -1,
  };

  return (
    <div>
      <NavBar handleLanguageChange={handleLanguageChange} />
      <div className="video-container">
        <YouTube
          videoId={videoId}
          onReady={onReady}
          opts={{ width: width, height: height }}
        />
        <Subtitles subtitles={subtitles} />
      </div>
    </div>
  );
}

export default YouTubePlayer;
