import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardContainer from "../../components/CardContainer";
import LanguageSettingController from "../../components/controllers/LanguageSettingController";
import ChipsContainer from "../../components/profile_chips/ChipsContainer";

function MobileHomePage() {
  const [videoData, setVideoData] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );
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
    const htmlElement = document.documentElement;
    htmlElement.style.transform = "";
    htmlElement.style.transformOrigin = "";
    htmlElement.style.width = "100dvw";
    htmlElement.style.height = "100dvh";
    htmlElement.style.overflowX = "";
    htmlElement.style.position = "";
    htmlElement.style.top = "";
    htmlElement.style.left = "";
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

  return (
    <div className="mobile-nav">
      <div className="mobile-header">
        <Link to="/about" className="mobile-tab">
          About
        </Link>
        <h1 className="mobile-title">Plave Subtitles</h1>
      </div>
      <div className="language-setting">
        <LanguageSettingController
          handleLanguageChange={handleLanguageChange}
        />
      </div>
      <ChipsContainer
        selectedLanguage={selectedLanguage}
        onFilterChange={handleFilterChange}
        videoData={filteredVideos}
        originalData={videoData}
      />
      <div className="mobile-card-container">
        <CardContainer videoData={filteredVideos} />
      </div>
    </div>
  );
}

export default MobileHomePage;
