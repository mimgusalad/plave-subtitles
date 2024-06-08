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
        srcset={`https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg 300w,
            https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg 250w`}
        sizes="(max-width: 768px) 300px,
            250px"
        src={`https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`}
        alt="thumbnail"
      ></img>
    </div>
  );
}
