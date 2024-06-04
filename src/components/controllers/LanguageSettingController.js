import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { languages } from "../../locale";

const StyledChip = styled(Chip)(
  ({ selectedLanguage, lang, isMobile, isTablet }) => ({
    fontWeight: "bold",
    height: "2em",
    fontSize: isMobile && !isTablet ? "12px" : "1em",
    backgroundColor: selectedLanguage === lang ? "white" : "transparent",
    opacity: selectedLanguage === lang ? 0.7 : 0.7,
  })
);

function LanguageSettingController({ handleLanguageChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );
  const handleLanguageClick = (lang) => {
    setSelectedLanguage(lang);
    handleLanguageChange(lang);
  };

  return (
    <>
      {Object.keys(languages).map((lang) => (
        <StyledChip
          key={lang}
          label={languages[lang]}
          onClick={() => handleLanguageClick(lang)}
          lang={lang}
          selectedLanguage={selectedLanguage}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      ))}
    </>
  );
}

export default LanguageSettingController;
