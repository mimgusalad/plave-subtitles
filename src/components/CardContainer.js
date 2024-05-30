import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isMobile = useMediaQuery({ query: "(max-width: 950px)" });

  const handleNavigation = () => {
    navigate("/watch?videoId=" + props.videoId);
  };

  const getClassName = (isMobile, isPortrait) => {
    let classNames = "card";
    if (isMobile) {
      classNames = "mobile-" + classNames;
      if (isPortrait) {
        classNames += "-portrait";
      } else {
        classNames += "-landscape";
      }
    } else {
      classNames = "desktop-" + classNames;
    }

    return classNames;
  };

  return (
    <div
      className={getClassName(isMobile, isPortrait)}
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
