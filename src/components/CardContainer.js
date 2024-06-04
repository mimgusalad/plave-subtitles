import { useNavigate } from "react-router-dom";
import getClassName from "../utils/getClassName";

function CardContainer({ videoData }) {
  return (
    <>
      {videoData.map((video) => (
        <Card key={video.videoId} videoId={video.videoId} />
      ))}
    </>
  );
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
        src={`https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`}
      ></img>
    </div>
  );
}
