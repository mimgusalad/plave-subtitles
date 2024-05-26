import React, { useEffect, useState } from "react";
import { IconButton, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const FontSizeController = () => {
  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem("fontSize")) || 25
  ); // Initial font size

  const updateFontSize = (newSize) => {
    const elements = document.getElementsByClassName("subtitle-container");
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
      {"Font Size"}
      <Box>
        <IconButton className="font-size-button" onClick={decreaseFontSize}>
          <KeyboardArrowDownIcon />
        </IconButton>
        {fontSize}
        <IconButton className="font-size-button" onClick={increaseFontSize}>
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default FontSizeController;
