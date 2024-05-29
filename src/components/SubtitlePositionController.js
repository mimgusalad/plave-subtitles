import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

const SubtitlePositionController = ({ selectedLanguage, isMobilePortrait }) => {
  let defaultPosition = isMobilePortrait ? 10 : 30;
  const offset = 10;
  const [position, setPosition] = useState(
    Number(localStorage.getItem("position")) || defaultPosition
  );

  const updatePosition = (newPosition) => {
    const subtitleType = localStorage.getItem("subtitleType");
    const elements = document.getElementsByClassName(
      !isMobilePortrait
        ? subtitleType === "0"
          ? "subtitle-container"
          : "subtitle-container-2"
        : "mobile-subtitle-container"
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

export default SubtitlePositionController;
