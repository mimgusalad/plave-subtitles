import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

const FontSizeController = ({ selectedLanguage }) => {
  const [isMobile, setIsMobile] = useState(false);
  let defaultFontSize;
  useEffect(() => {
    if (window.innerWidth <= 450 && window.innerHeight <= 940) {
      defaultFontSize = 16;
      setIsMobile(true);
    } else {
      defaultFontSize = 25;
    }
  }, []);
  const fontText = {
    en: "Font Size",
    ko: "자막 크기",
    ja: "フォントサイズ",
  };

  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem("fontSize")) || defaultFontSize
  ); // Initial font size

  const updateFontSize = (newSize) => {
    const subtitleType = localStorage.getItem("subtitleType");
    const elements = document.getElementsByClassName(
      !isMobile
        ? subtitleType === "0"
          ? "subtitle-container"
          : "subtitle-container-2"
        : "mobile-subtitle-container"
    );
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
    <div className="font-size-controller">
      {fontText[selectedLanguage]}
      <Box>
        <IconButton
          sx={{ color: "white" }}
          className="font-size-button"
          onClick={decreaseFontSize}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
        {fontSize}
        <IconButton
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

export default FontSizeController;
