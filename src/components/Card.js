import { useNavigate } from "react-router-dom";
function Card(props) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/watch?videoId=" + props.videoId);
  };

  return (
    <div className="card" onClick={handleNavigation}>
      <img src={`${props.imgUrl}`}></img>
    </div>
  );
}

export default Card;
