import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardContainer from "../../components/CardContainer";
import ChipsContainer from "../../components/ChipsContainer";
import LanguageSetting from "../../components/LanguageSetting";
import { images } from "../../locale";

function DesktopHomePage() {
  const [videoData, setVideoData] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [imageCache, setImageCache] = useState({});
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
    const preloadImages = () => {
      const cache = {};
      images.forEach((image) => {
        const img = new Image();
        img.src = process.env.PUBLIC_URL + "/img/profile/" + image;
        cache[image] = img;
      });
      setImageCache(cache);
    };

    changeBackgroundColor();
    fetchData();
  }, []);

  return (
    <>
      <div className="header">
        <Link to="/about" className="tabStyle">
          About
        </Link>
        <h1 className="title">Plave Subtitles</h1>
      </div>

      <div className="desktop-language-setting">
        <LanguageSetting handleLanguageChange={handleLanguageChange} />
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
