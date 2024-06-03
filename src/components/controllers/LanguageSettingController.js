import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { languages } from "../../locale";

const StyledChip = styled(Chip)(({ selectedLanguage, lang }) => ({
  fontWeight: "bold",
  fontSize: "1em",
  backgroundColor: selectedLanguage === lang ? "white" : "transparent",
  opacity: selectedLanguage === lang ? 0.7 : 0.7,
  "@media (max-height: 700px)": {
    fontSize: "12px",
  },
  "@media (min-height: 701px) and (max-height: 783px)": {
    fontSize: "14px",
  },
}));

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
        />
      ))}
    </>
  );
}

export default LanguageSettingController;
