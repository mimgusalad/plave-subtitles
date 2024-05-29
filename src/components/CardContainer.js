import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isMobile = useMediaQuery({ query: "(max-width: 1439px)" });

  const handleNavigation = () => {
    navigate("/watch?videoId=" + props.videoId);
  };

  return (
    <div
      className={`${isMobile ? "mobile" : ""}-card${
        isPortrait ? "-portrait" : "-landscape"
      }`}
      onClick={handleNavigation}
    >
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
