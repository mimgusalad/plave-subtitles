import React, { useState } from "react";
import "./ExpandableButton.css";
import LanguageSelector from "./LanguageSelector";
import FontSizeController from "./FontSizeController";

const ExpandableButton = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    if (expanded) {
      setExpanded(false);
    }
  };

  return (
    <button
      className={`expandable-button ${expanded ? "expanded" : ""}`}
      onClick={toggleExpand}
    >
      <span className="material-icons">{expanded ? "close" : "subtitles"}</span>
      {"Settings"}
      {expanded && (
        <>
          <FontSizeController />
          <LanguageSelector />
        </>
      )}
      {expanded && (
        <span
          className="close-icon material-icons"
          onClick={handleClose}
        ></span>
      )}
    </button>
  );
};

export default ExpandableButton;
