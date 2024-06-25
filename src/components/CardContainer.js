import { CircularProgress } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import getClassName from "../utils/getClassName";

function CardContainer({ videoData }) {
  const cards = useMemo(() => {
    return videoData.map((video) => <Card key={video.VideoId} data={video} />);
  }, [videoData]);

  return <>{cards}</>;
}

export default CardContainer;

function Card(props) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/watch?videoId=" + props.data.VideoId);
  };
  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <div className={getClassName()} onClick={handleNavigation}>
      {loading && (
        <CircularProgress
          sx={{
            color: "snow",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-20px",
            marginLeft: "-20px",
          }}
        />
      )}
      <img
        key={props.videoId}
        src={props.data.Thumbnail}
        width={400}
        alt="thumbnail"
        onLoad={handleImageLoad}
        style={loading ? { display: "none" } : {}}
      />
    </div>
  );
}
