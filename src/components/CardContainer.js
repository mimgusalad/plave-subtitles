import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/watch?videoId=" + props.videoId);
  };

  return (
    <div className="card" onClick={handleNavigation}>
      <img
        src={`https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`}
      ></img>
    </div>
  );
}

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
