import axios from "axios";
import { useEffect, useState } from "react";
import { isTablet } from "react-device-detect";
import { Link } from "react-router-dom";
import CardContainer from "../components/CardContainer";
import LanguageSettingController from "../components/controllers/LanguageSettingController";
import ChipsContainer from "../components/profile_chips/ChipsContainer";
import IntroPage from "./IntroPage";

function DesktopHomePage() {
  const [videoData, setVideoData] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isOpen, setIsOpen] = useState(
    sessionStorage.getItem("isOpen") === "false" ? false : true
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang")
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

    document.body.classList.remove("background-transition");
    fetchData();
  }, []);

  const handleClickEnter = () => {
    setIsOpen(false);
    sessionStorage.setItem("isOpen", false);
  };

  const handleFilterChange = (videos) => {
    setFilteredVideos(videos);
  };

  const handleLanguageChange = (language) => {
    localStorage.setItem("lang", language);
    setSelectedLanguage(language);
  };

  return (
    <>
      {isOpen && <IntroPage handleClickEnter={handleClickEnter} />}
      <div className="header">
        <Link to="/about" className="tabStyle">
          About
        </Link>
        <h1 className={`title`}>Plave Subtitles</h1>
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
      <div className={`${isTablet ? "tablet" : "desktop"}-card-container`}>
        <CardContainer videoData={filteredVideos} />
      </div>
    </>
  );
}

export default DesktopHomePage;
