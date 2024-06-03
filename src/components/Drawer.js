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
  language,
  subtitleDesignText,
  subtitlePositionText,
} from "../locale";
import getBottom from "../utils/getBottom";
import SubtitleTypeController from "./controllers/SubtitleTypeController";

function SubtitleSettingDrawer({ handleTypeChange, handleLanguageChange }) {
  const [state, setState] = useState({
    right: false,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const lang = localStorage.getItem("lang") || "ko";
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
          <Chip sx={{ color: "snow" }} label={language[lang]} size="small" />
        </Divider>
        <LanguageSelector handleLanguageChange={handleLanguageChange} />
        <Divider textAlign="left">
          <Chip sx={{ color: "snow" }} label={fontText[lang]} size="small" />
        </Divider>
        <FontSizeController lang={lang} />
        <Divider textAlign="left">
          <Chip
            sx={{ color: "snow" }}
            label={subtitlePositionText[lang]}
            size="small"
          />
        </Divider>
        <PositionController lang={lang} />
        <Divider textAlign="left">
          <Chip
            sx={{ color: "snow" }}
            label={subtitleDesignText[lang]}
            size="small"
          />
        </Divider>
        <SubtitleTypeController handleTypeChange={handleTypeChange} />
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Right Drawer</Button>
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

function PositionController({ lang }) {
  const [currentOffset, setOffset] = useState(
    localStorage.getItem("offset") || 200
  );
  const offset = 10;

  const updatePosition = (newPosition) => {
    const elements = document.getElementsByClassName("subtitle-container");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.top = getBottom() - newPosition + "px";
    }
  };

  const increasePosition = () => {
    setOffset((prevPosition) => prevPosition + currentOffset);
    updatePosition(offset + currentOffset);
  };

  const decreasePosition = () => {
    setOffset((prevPosition) => prevPosition - currentOffset);
    updatePosition(offset - currentOffset);
  };

  useEffect(() => {
    updatePosition(offset);
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
