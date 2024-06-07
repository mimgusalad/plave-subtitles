import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="desktop-home-link" style={{ zIndex: "100" }}>
      <Link
        to="/"
        style={{
          fontSize: "1.3em",
          textDecoration: "none",
          color: "snow",
          fontWeight: "bold",
          position: "fixed",
          top: 0,
          left: 0,
          marginTop: "10px",
          padding: "0 10px",
          cursor: "pointer",
        }}
      >
        {/* {"HOME"} */}
        <ArrowBackIosNewIcon />
      </Link>
    </div>
  );
}

export default Home;
