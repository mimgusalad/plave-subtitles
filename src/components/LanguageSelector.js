import { ButtonGroup, Button } from "react-bootstrap";

function LanguageSelector({ selectedLanguage, handleLanguageChange }) {
  return (
    <ButtonGroup aria-label="Language Selector">
      <Button
        variant={selectedLanguage === "kr" ? "primary" : "secondary"}
        onClick={() => handleLanguageChange("kr")}
      >
        한국어
      </Button>
      <Button
        variant={selectedLanguage === "en" ? "primary" : "secondary"}
        onClick={() => handleLanguageChange("en")}
      >
        English
      </Button>
      <Button
        variant={selectedLanguage === "jp" ? "primary" : "secondary"}
        onClick={() => handleLanguageChange("jp")}
      >
        日本語
      </Button>
    </ButtonGroup>
  );
}
export default LanguageSelector;
