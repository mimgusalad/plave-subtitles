import React, { useState } from "react";
function LanguageSelector({ handleLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ko"); // Default to Korean

  const languages = {
    ko: "Korean",
    en: "English",
    ja: "Japanese",
  };

  const handleLanguageClick = (language) => {
    handleLanguageChange(language);
    setSelectedLanguage(language);
    setIsOpen(false);
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
    <li>
      <h3 style={{ cursor: "pointer" }} onClick={() => setIsOpen(!isOpen)}>
        {getLanguageLabel(selectedLanguage).toUpperCase()}
      </h3>
      {isOpen && (
        <ul style={{ cursor: "pointer" }}>
          {Object.keys(languages).map((lang) => (
            <li key={lang} onClick={() => handleLanguageClick(lang)}>
              {languages[lang].toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default LanguageSelector;
