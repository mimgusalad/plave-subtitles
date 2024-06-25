import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import content from "../about-content";
import "../css/about.css";

function AboutPage() {
  const [selectedLang, setSelectedLang] = useState("ko");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isSubtitleOpen, setIsSubtitleOpen] = useState(false);
  const [isTranslationOpen, setIsTranslationOpen] = useState(false);
  const [isDevelopmentOpen, setIsDevelopmentOpen] = useState(false);

  const handleJapanese = () => {
    const element = document.getElementsByClassName("about-content")[0];
    if (selectedLang === "ja") {
      element.style.wordBreak = "break-all";
    } else {
      element.style.wordBreak = "keep-all";
    }
  };

  useEffect(() => {
    handleJapanese();
  }, [selectedLang]);

  return (
    <>
      <Link to="/" style={tabStyle}>
        {"HOME"}
      </Link>
      <ul id="content-lang">
        <li onClick={() => setSelectedLang("ko")}>한국어</li>ㅣ
        <li onClick={() => setSelectedLang("en")}>English</li>ㅣ
        <li onClick={() => setSelectedLang("ja")}>日本語</li>
      </ul>
      <div id="about-page">
        <div className="about-content">
          <p>{content[selectedLang]["intro"]}</p>
          <p>{content[selectedLang]["p1"]}</p>
          <span onClick={() => setIsViewOpen(!isViewOpen)}>
            {`📃 `}
            {content[selectedLang]["view"]["title"]}
          </span>
          {isViewOpen && <p>{content[selectedLang]["view"]["content"]}</p>}
          <p></p>
          <span onClick={() => setIsSubtitleOpen(!isSubtitleOpen)}>
            {`📃 `}
            {content[selectedLang]["subtitle"]["title"]}
          </span>
          {isSubtitleOpen && (
            <p>{content[selectedLang]["subtitle"]["content"]}</p>
          )}
          <p></p>
          <span onClick={() => setIsTranslationOpen(!isTranslationOpen)}>
            {`📃 `}
            {content[selectedLang]["translation"]["title"]}
          </span>
          {isTranslationOpen && (
            <p>{content[selectedLang]["translation"]["content"]}</p>
          )}
          <p></p>
          <p>{content[selectedLang]["p2"]}</p>
          <p>{content[selectedLang]["last"]}</p>
          <p>{content[selectedLang]["p3"]}</p>
          <p>{content[selectedLang]["p4"]}</p>
          <p>{content[selectedLang]["p5"]}</p>
          <Email />
        </div>
      </div>
    </>
  );
}

export default AboutPage;

function Email() {
  const [open, setOpen] = useState(false);
  const email = "underbar.sari@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    });
  };

  return (
    <div style={EmailStyle}>
      {email}
      <Tooltip
        arrow
        title="copied"
        placement="top"
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <IconButton onClick={handleCopy}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

const EmailStyle = {
  width: "fit-content",
  backgroundColor: "white",
  color: "black",
  opacity: "0.7",
  borderRadius: "5px",
  padding: "5px",
  paddingLeft: "15px",
};
const tabStyle = {
  display: "inline-block",
  fontSize: "1.3em",
  fontWeight: "bold",
  textDecoration: "none",
  color: "white",
  marginLeft: "20px",
  marginTop: "10px",
  padding: "0 10px",
};
