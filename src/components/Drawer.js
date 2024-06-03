import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Chip, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import React, { useEffect, useRef, useState } from "react";
import {
  currentFontText,
  fontText,
  informationText,
  language,
  subtitleDesignText,
  subtitlePositionText,
} from "../locale";
import SubtitleTypeController from "./controllers/SubtitleTypeController";

function SubtitleSettingDrawer({
  lang,
  handleTypeChange,
  handleLanguageChange,
  handleOffsetChange,
  currentOffset,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

  const list = () => (
    <Box
      sx={{ width: "max-content" }}
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Divider textAlign="left">
          <Chip
            sx={{ color: "snow" }}
            label={`📌 ${language[lang]}`}
            size="large"
          />
        </Divider>
        <LanguageSelector handleLanguageChange={handleLanguageChange} />
        <Divider textAlign="left">
          <Chip
            sx={{ color: "snow" }}
            label={`📌 ${fontText[lang]}`}
            size="large"
          />
        </Divider>
        <FontSizeController lang={lang} />
        <Divider textAlign="left">
          <Chip
            sx={{ color: "snow" }}
            label={`📌 ${subtitlePositionText[lang]}`}
            size="large"
          />
        </Divider>
        <PositionController
          lang={lang}
          handleOffsetChange={handleOffsetChange}
          currentOffset={currentOffset}
        />
        <Divider textAlign="left">
          <Chip
            sx={{ color: "snow" }}
            label={`📌 ${subtitleDesignText[lang]}`}
            size="large"
          />
        </Divider>
        <SubtitleTypeController
          handleTypeChange={handleTypeChange}
          lang={lang}
        />
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className="drawer">
      {!isDrawerOpen && (
        <Button
          className="drawer-button"
          sx={{ fontSize: "1.3em", fontWeight: "bold", color: "snow" }}
          onClick={toggleDrawer(true)}
        >
          {`🛸 ${informationText[lang]} 🛸`}
        </Button>
      )}
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgb(97, 97, 97, 0.7)", // Change this to your desired color
            color: "white", // Change this to your desired text color
          },
        }}
        anchor="right"
        open={isDrawerOpen}
        ref={drawerRef}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}

export default SubtitleSettingDrawer;

function FontSizeController({ lang }) {
  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem("fontSize"))
  );

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
    <div className="subtitle-font-size-controller">
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
        {`${currentFontText[lang]} : `}
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
}

function PositionController({ lang, handleOffsetChange, currentOffset }) {
  const offset = 10;

  const updatePosition = (newPosition) => {
    handleOffsetChange(newPosition);
  };

  const increasePosition = () => {
    handleOffsetChange(currentOffset - offset);
    updatePosition(currentOffset - offset);
  };

  const decreasePosition = () => {
    handleOffsetChange(currentOffset + offset);
    updatePosition(currentOffset + offset);
  };

  useEffect(() => {
    updatePosition(currentOffset);
    localStorage.setItem("offset", currentOffset);
  }, [currentOffset]);

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
        {subtitlePositionText[lang]}
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
}

function LanguageSelector({ handleLanguageChange }) {
  return (
    <ul className="language-selector">
      <li onClick={() => handleLanguageChange("ko")}>한국어</li>
      <li onClick={() => handleLanguageChange("en")}>English</li>
      <li onClick={() => handleLanguageChange("ja")}>日本語</li>
    </ul>
  );
}
