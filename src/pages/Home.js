import Card from "../components/cards";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [videos, setVideos] = useState([]);
  // use skeleton when loading
  const fetchData = () => {
    axios
      .get("https://mimgusalad.github.io/plave/img/data.json")
      .then((res) => setVideos(res.data.info));
  };

  const changeBackgroundColor = () => {
    document.body.style.transition = "background-color 0.5s ease";
    document.body.style.backgroundColor = "#222222";
  };

  const imgUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  useEffect(() => {
    changeBackgroundColor();
    fetchData();
  }, []);

  return (
    <div className="card-container">
      {videos.map((video) => (
        <Card videoId={video.videoId} imgUrl={imgUrl(video.videoId)}></Card>
      ))}
    </div>
  );
}

export default Home;
