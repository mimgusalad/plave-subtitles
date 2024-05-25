import { Chip } from "@mui/material";
import React, { useState } from "react";

function LanguageSetting({ handleLanguageChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const languages = {
    ko: "한국어",
    en: "English",
    ja: "日本語",
  };
  const handleLanguageClick = (lang) => {
    setSelectedLanguage(lang);
    handleLanguageChange(lang);
  };

  const baseStyle = {
    backgroundColor: "white",
    opacity: 0.7,
    fontWeight: "bold",
  };

  const getStyle = (lang) => ({
    ...baseStyle,
    backgroundColor: selectedLanguage === lang ? "white" : "transparent",
    opacity: selectedLanguage === lang ? 1 : 0.7,
  });

  return (
    <>
      {Object.keys(languages).map((lang) => (
        <Chip
          key={lang}
          label={languages[lang]}
          onClick={() => handleLanguageClick(lang)}
          style={getStyle(lang)}
          //   color={selectedLanguage === lang ? "primary" : "default"}
        />
      ))}
    </>
  );
}

export default LanguageSetting;
