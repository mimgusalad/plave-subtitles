import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardContainer from "../../components/cards/CardContainer";
import LanguageSettingController from "../../components/controllers/LanguageSettingController";
import ChipsContainer from "../../components/profile_chips/ChipsContainer";

function DesktopHomePage() {
  const [videoData, setVideoData] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang") || "ko"
  );

  useEffect(() => {
    localStorage.setItem("lang", selectedLanguage);
  }, [selectedLanguage]);

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

    const changeBackgroundColor = () => {
      document.body.classList.remove("background-transition");
    };

    changeBackgroundColor();
    fetchData();
  }, []);

  const handleFilterChange = (videos) => {
    setFilteredVideos(videos);
  };

  const handleLanguageChange = (language) => {
    localStorage.setItem("lang", language);
    setSelectedLanguage(language);
  };

  return (
    <>
      <div className="header">
        <Link to="/about" className="tabStyle">
          About
        </Link>
        <h1 className="title">Plave Subtitles</h1>
      </div>
      <div className="desktop-language-setting">
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
      <div className="desktop-card-container">
        <CardContainer videoData={filteredVideos} />
      </div>
    </>
  );
}

export default DesktopHomePage;
