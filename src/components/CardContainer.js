import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import getClassName from "../utils/getClassName";

function CardContainer({ videoData }) {
  const cards = useMemo(() => {
    return videoData.map((video) => (
      <Card key={video.VideoId} videoId={video.VideoId} />
    ));
  }, [videoData]);

  return <>{cards}</>;
}

export default CardContainer;

function Card(props) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/watch?videoId=" + props.videoId);
  };

  return (
    <div className={getClassName()} onClick={handleNavigation}>
      <img
        key={props.videoId}
        src={`https://mimgusalad.github.io/plave/thumbnail/${props.videoId}.avif`}
        alt="thumbnail"
      />
    </div>
  );
}
