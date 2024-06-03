import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

function Email() {
  const [open, setOpen] = useState(false);
  const email = "underbar.sari@gmail.com";

  const backgroundStyle = {
    width: "fit-content",
    backgroundColor: "white",
    color: "black",
    opacity: "0.7",
    borderRadius: "5px",
    padding: "5px",
    paddingLeft: "15px",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    });
  };

  return (
    <div style={backgroundStyle}>
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

function AboutPage() {
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

  const contentStyle = {
    height: "50vh",
    padding: "20px 30px",
    margin: "20px 30px",
    color: "black",
  };
  return (
    <>
      <Link to="/" style={tabStyle}>
        {"HOME"}
      </Link>
      <div className="about-content" style={contentStyle}>
        <p>안녕하세요왜 안나오냐고</p>
        <Email />
      </div>
    </>
  );
}

export default AboutPage;
