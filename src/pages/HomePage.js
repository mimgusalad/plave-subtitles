import { useEffect, useState } from "react";
import axios from "axios";
import CardContainer from "../components/CardContainer";
import ChipsContainer from "../components/ChipsContainer";
import LanguageSetting from "../components/LanguageSetting";

function HomePage() {
  const [videoData, setVideoData] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  localStorage.setItem("lang", selectedLanguage);

  const handleFilterChange = (videos) => {
    setFilteredVideos(videos);
  };

  const handleLanguageChange = (language) => {
    localStorage.setItem("lang", language);
    setSelectedLanguage(language);
  };

  const changeBackgroundColor = () => {
    document.body.style.background = "no-repeat url('/img/bg.png')";
    document.body.style.backgroundSize = "fit";
    document.body.style.overflow = "hidden";
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

  return (
    <>
      <h1 className="title">Plave Subtitles</h1>
      <LanguageSetting handleLanguageChange={handleLanguageChange} />
      <ChipsContainer
        selectedLanguage={selectedLanguage}
        onFilterChange={handleFilterChange}
        videoData={filteredVideos}
        originalData={videoData}
      />
      <div className="card-container">
        <CardContainer videoData={filteredVideos} />
      </div>
    </>
  );
}

export default HomePage;
