import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const fontText = {
  en: "Font Size",
  ko: "자막 크기",
  ja: "フォントサイズ",
};

const FontSizeController = ({ selectedLanguage }) => {
  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem("fontSize")) || defaultFontSize
  ); // Initial font size
  const isMobile = useMediaQuery({ query: "(max-width: 950px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  let defaultFontSize;

  const getElementName = (isMobile, isPortrait) => {
    if (isMobile) {
      if (isPortrait) {
        return "mobile-subtitle-container-portrait";
      } else {
        return "mobile-subtitle-container-landscape";
      }
    } else {
      if (localStorage.getItem("subtitleType") === "0")
        return "subtitle-container";
      else return "subtitle-container-2";
    }
  };

  const getElementNameBySubtitleType = (subtitleType) => {
    switch (subtitleType) {
      case "b1": // BlackFontWithNoGapAndName
        return "chat-bubble";
      case "b2": //BlackFontWithGap
        return "chat-bubble";
      case "b3": //BlackFontWithNoGap
      case "w1": //WhiteFontWithGap
        return "chat-bubble";
      case "w2": //WhiteFontWithNoGap
        return "chat-bubble";
      case "w3": //WhiteFontWithNoGapAndName
        return "chat-bubble";
      case "w4": //WhiteFontWithTail
        return "chat-bubble";
    }
  };

  const updateFontSize = (newSize) => {
    const subtitleType = localStorage.getItem("subtitleType");
    let elementName = getElementName(isMobile, isPortrait);
    const elements = document.getElementsByClassName(
      elementName !== null ? elementName : "chat-bubble"
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

export default FontSizeController;
