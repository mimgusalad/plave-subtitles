import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import MobileChipsContainer from "../../MobileComponents/MobileChipsContainer";
import CardContainer from "../../components/CardContainer";
import LanguageSetting from "../../components/LanguageSetting";

function MobileHomePage() {
  const [videoData, setVideoData] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isMobile = useMediaQuery({ query: "(max-width: 950px)" });

  localStorage.setItem("lang", selectedLanguage);

  const handleFilterChange = (videos) => {
    setFilteredVideos(videos);
  };

  const handleLanguageChange = (language) => {
    localStorage.setItem("lang", language);
    setSelectedLanguage(language);
  };

  const changeBackgroundColor = () => {
    document.body.classList.remove("background-transition");
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://mimgusalad.github.io/plave/img/data.json")
        .then((res) => {
          setFilteredVideos(res.data.info);
          setVideoData(res.data.info);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    changeBackgroundColor();
    fetchData();
  }, []);

  const getClassName = (isMobile, isPortrait) => {
    if (isMobile) {
      return isPortrait
        ? "mobile-language-setting-portrait"
        : "mobile-language-setting-landscape";
    } else {
      return "language-setting";
    }
  };

  return (
    <>
      <div className="mobile-header">
        <Link
          to="/about"
          className={`mobile-tab-${isPortrait ? "portrait" : "landscape"}`}
        >
          About
        </Link>
        <h1
          className={`mobile-title${isPortrait ? "-portrait" : "-landscape"}`}
        >
          Plave Subtitles
        </h1>
      </div>
      <div className={getClassName(isMobile, isPortrait)}>
        <LanguageSetting handleLanguageChange={handleLanguageChange} />
        {getClassName}
      </div>
      <MobileChipsContainer
        selectedLanguage={selectedLanguage}
        onFilterChange={handleFilterChange}
        videoData={filteredVideos}
        originalData={videoData}
      />
      <div
        className={`mobile-card-container-${
          isPortrait ? "portrait" : "landscape"
        }`}
      >
        <CardContainer videoData={filteredVideos} />
      </div>
    </>
  );
}

export default MobileHomePage;
