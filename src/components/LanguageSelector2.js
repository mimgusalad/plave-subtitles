import { hexToRgb } from "@mui/material";
import { fontWeight, height, margin, padding } from "@mui/system";
import React, { useState } from "react";
function LanguageSelector({ handleLanguageChange }) {
  const languages = {
    ko: "한국어",
    en: "English",
    ja: "日本語",
  };
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageClick = (lang) => {
    setSelectedLanguage(lang);
  };

  const baseStyle = {
    padding: "5px",
    cursor: "pointer",
    listStyleType: "none",
    width: "fit",
    marginBottom: "5px",
    marginTop: "5px",
    textAlign: "center",
  };

  const getStyle = (lang) => ({
    ...baseStyle,
    backgroundColor: selectedLanguage === lang ? "white" : "transparent",
    borderRadius: "15px",
    fontWeight: selectedLanguage === lang ? "bold" : "normal",
  });

  return (
    <ul className="language-selector-container">
      {Object.keys(languages).map((lang) => (
        <li
          style={getStyle(lang)}
          key={lang}
          onClick={() => handleLanguageClick(lang)}
        >
          {languages[lang]}
        </li>
      ))}
    </ul>
  );
}

export default LanguageSelector;
