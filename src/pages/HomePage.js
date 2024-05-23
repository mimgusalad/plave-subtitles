import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import ChipsContainer from "../components/ChipsContainer";

function HomePage() {
  const [videoData, setVideoData] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  const handleFilterChange = (videos) => {
    setFilteredVideos(videos);
  };

  // use skeleton when loading
  const fetchData = () => {
    axios
      .get("https://mimgusalad.github.io/plave/img/data.json")
      .then((res) => {
        setFilteredVideos(res.data.info);
        setVideoData(res.data.info);
      });
  };

  const changeBackgroundColor = () => {
    document.body.style.transition = "background-color 0.5s ease";
    document.body.style.backgroundColor = "#282828";
  };

  const imgUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  useEffect(() => {
    changeBackgroundColor();
    fetchData();
  }, []);

  console.log(filteredVideos);

  return (
    <>
      <ChipsContainer
        onFilterChange={handleFilterChange}
        videoData={filteredVideos}
        fullData={videoData}
      />
      <div className="card-container">
        {filteredVideos.map((video) => (
          <Card
            key={video.videoId}
            videoId={video.videoId}
            imgUrl={imgUrl(video.videoId)}
          />
        ))}
      </div>
    </>
  );
}

export default HomePage;
