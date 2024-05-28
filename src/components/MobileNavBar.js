import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FontSizeController from "./FontSizeController";

function MobileNavBar({ selectedLanguage }) {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  useEffect(() => {
    if (window.innerWidth < window.innerHeight && window.innerWidth < 500) {
      setIsMobilePortrait(true);
    }
  }, []);

  return (
    <div className="mobile-nav-bar">
      {isMobilePortrait ? (
        <>
          <FontSizeController selectedLanguage={selectedLanguage} />
          <SubtitlePosition selectedLanguage={selectedLanguage} />
          <Home className="portrait-home-link" />
        </>
      ) : (
        <>
          <Home className="home-link" />
          <FontSizeController selectedLanguage={selectedLanguage} />
        </>
      )}
      {isMobilePortrait ? null : (
        <SubtitlePosition selectedLanguage={selectedLanguage} />
      )}
    </div>
  );
}

function Home(classname) {
  return (
    <Link
      className={classname}
      to="/"
      style={{
        fontSize: "1.3em",
        textDecoration: "none",
        color: "rgb(207, 201, 201)",
        fontWeight: "bold",
      }}
    >
      {"HOME"}
    </Link>
  );
}

const SubtitlePosition = ({ selectedLanguage }) => {
  let defaultPosition = 10;
  const offset = 10;
  const [position, setPosition] = useState(
    Number(localStorage.getItem("position")) || defaultPosition
  );

  const updatePosition = (newPosition) => {
    const elements = document.getElementsByClassName(
      "mobile-subtitle-container"
    );
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.bottom = `${newPosition}px`;
    }
  };

  const increasePosition = () => {
    setPosition((prevPosition) => prevPosition + offset);
    updatePosition(position + offset);
  };

  const decreasePosition = () => {
    setPosition((prevPosition) => prevPosition - offset);
    updatePosition(position - offset);
  };

  useEffect(() => {
    updatePosition(position);
    localStorage.setItem("position", position);
  }, [position]);

  const subText = {
    en: "Sub Position",
    ko: "자막 위치",
    ja: "字幕の位置",
  };

  return (
    <div className="subtitle-position-controller">
      <Box>
        <IconButton sx={{ color: "white" }} onClick={decreasePosition}>
          <KeyboardArrowDownIcon />
        </IconButton>
        {subText[selectedLanguage]}
        <IconButton sx={{ color: "white" }} onClick={increasePosition}>
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default MobileNavBar;
