import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { fontText } from "../../locale";

const SubtitleFontSizeController = ({ selectedLanguage }) => {
  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem("fontSize"))
  );
  const isMobile = useMediaQuery({ query: "(max-width: 950px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  const getElementName = (isMobile, isPortrait) => {
    if (isMobile) {
      if (isPortrait) {
        return "mobile-subtitle-container-portrait";
      } else {
        return "mobile-subtitle-container-landscape";
      }
    }
    return "subtitle-container";
  };

  const updateFontSize = (newSize) => {
    let elementName = getElementName(isMobile, isPortrait);
    const elements = document.getElementsByClassName(elementName);
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.fontSize = `${newSize}px`;
    }
  };
  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 1);
    updateFontSize(fontSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => prevSize - 1);
    updateFontSize(fontSize - 1);
  };

  useEffect(() => {
    updateFontSize(fontSize);
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  return (
    <div className={`${isMobile ? "mobile-" : ""}font-size-controller`}>
      <Box>
        <IconButton
          disableRipple
          disableFocusRipple
          sx={{ color: "white" }}
          className="font-size-button"
          onClick={decreaseFontSize}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
        {`${fontText[selectedLanguage]} : `}
        {fontSize}
        <IconButton
          disableRipple
          disableFocusRipple
          sx={{ color: "white" }}
          className="font-size-button"
          onClick={increaseFontSize}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default SubtitleFontSizeController;
