import React, { useState } from "react";
import { Button, Menu, MenuItem, Box } from "@mui/material";
import Subtitles from "@mui/icons-material/Subtitles";

function LanguageFab({ handleSubtitleLanguageChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("ko"); // Default to Korean

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    handleClose();
  };

  const getLanguageLabel = (language) => {
    switch (language) {
      case "en":
        return "english";
      case "ko":
        return "korean";
      case "ja":
        return "japanese";
      default:
        return "korean";
    }
  };

  return (
    <Box className="language-fab-container">
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        startIcon={<Subtitles />}
        className="language-fab-button"
      >
        {getLanguageLabel(selectedLanguage)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          mt: 2,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={() => {
            handleLanguageChange("ko");
            handleSubtitleLanguageChange("ko");
          }}
        >
          Korean
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLanguageChange("en");
            handleSubtitleLanguageChange("en");
          }}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLanguageChange("ja");
            handleSubtitleLanguageChange("ja");
          }}
        >
          Japanese
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default LanguageFab;
