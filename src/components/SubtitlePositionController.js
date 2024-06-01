import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { subtitlePositionText } from "../locale";

const SubtitlePositionController = ({ selectedLanguage }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 950px)" });
  let defaultPosition = isMobile ? 10 : 30;
  const offset = 10;
  const [position, setPosition] = useState(
    Number(localStorage.getItem("position")) || defaultPosition
  );

  const getElementName = (isMobile) => {
    if (isMobile) return "mobile-subtitle-container-landscape";
    return "subtitle-container";
  };

  const updatePosition = (newPosition) => {
    const type = localStorage.getItem("type");
    const elements = document.getElementsByClassName(getElementName(isMobile));
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

  return (
    <div className="subtitle-position-controller">
      <Box>
        <IconButton
          disableRipple
          disableFocusRipple
          sx={{ color: "white" }}
          onClick={decreasePosition}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
        {subtitlePositionText[selectedLanguage]}
        <IconButton
          disableRipple
          disableFocusRipple
          sx={{ color: "white" }}
          onClick={increasePosition}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default SubtitlePositionController;
