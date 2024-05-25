import FontSizeController from "./FontSizeController";
import LanguageSelector from "./LanguageSelector";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

function Sidebar({ selectedLanguage, handleLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="setting-container">
      <button onClick={() => setIsOpen(!isOpen)}>
        <SubtitlesIcon /> {"Settings"}
      </button>
      {isOpen && (
        <div>
          <SidebarContent
            selectedLanguage={selectedLanguage}
            handleLanguageChange={handleLanguageChange}
          />
        </div>
      )}
    </div>
  );
}

function SidebarContent({ selectedLanguage, handleLanguageChange }) {
  return (
    <ul className="sidebar-content">
      <li>
        <FontSizeController />
      </li>
      <li>
        <LanguageSelector
          handleLanguageChange={handleLanguageChange}
          selectedLanguage={selectedLanguage}
        />
      </li>
    </ul>
  );
}

export default Sidebar;
