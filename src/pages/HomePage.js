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
    document.body.style.transition = "background 1s ease";
    document.body.style.background = "no-repeat url('/img/bg.png')";
    document.body.style.backgroundSize = "fit";
    document.body.style.overflow = "hidden";
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
      <h1 className="title">Plave Subtitles</h1>
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
