import { Link } from "react-router-dom";
import LanguageSetting from "./LanguageSetting";
import FontSizeController from "./FontSizeController";

function NavBar({ handleLanguageChange }) {
  const icyblue = "rgb(207, 201, 201)";
  const style = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
  };

  const innerStyle = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  };

  return (
    <div style={style}>
      <Link
        to="/"
        style={{
          fontSize: "1.3em",
          textDecoration: "none",
          color: icyblue,
          fontWeight: "bold",
        }}
      >
        {"HOME"}
      </Link>
      <div style={innerStyle}>
        <LanguageSetting handleLanguageChange={handleLanguageChange} />
      </div>
      <FontSizeController />
    </div>
  );
}

export default NavBar;
