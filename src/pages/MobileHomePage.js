import { useEffect, useState } from "react";
import { isTablet } from "react-device-detect";
import { Link } from "react-router-dom";
import CardContainer from "../components/CardContainer";
import LanguageSettingController from "../components/controllers/LanguageSettingController";
import ChipsContainer from "../components/profile_chips/ChipsContainer";
import { resetHtml } from "../utils/changeRotation";
import IntroPage from "./IntroPage";
function MobileHomePage({ videoData }) {
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang")
  );
  const [isOpen, setIsOpen] = useState(
    sessionStorage.getItem("isOpen") === "false" ? false : true
  );

  useEffect(() => {
    setFilteredVideos(videoData);
  }, [videoData]);

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

  useEffect(() => {
    resetHtml();
    setMobileHtml();
  }, []);

  return (
    <>
      {isOpen && <IntroPage handleClickEnter={handleClickEnter} />}
      {!isTablet && (
        <div className="mobile-nav">
          <div className="mobile-header">
            <Link to="/about" className="mobile-tab">
              About
            </Link>
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
      )}
    </>
  );
}

export default MobileHomePage;

const setMobileHtml = () => {
  // Create a new style element
  const style = document.createElement("style");

  // Define the CSS content
  const css = `
html,
body {
    height: 100dvh;
    height: var(--vh);
}
`;

  // Add the CSS content to the style element
  style.innerHTML = css;
  document.head.appendChild(style);
};
