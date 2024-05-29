import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useState } from "react";
import FontSizeController from "../components/FontSizeController";
import SubtitlePositionController from "../components/SubtitlePositionController";

const text = {
  en: "Sub Setting",
  ko: "자막 설정",
  ja: "字幕設定",
};

const MobileMenu = ({ lang }) => {
  const [open, setOpen] = useState(false);

  const handleSettingClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton style={ButtonStyle} onClick={handleSettingClick}>
        {!open && <MenuIcon style={IconStyle} />}
      </IconButton>
      <Menu lang={lang} setOpen={setOpen} open={open} />
    </>
  );
};

const Menu = ({ lang, setOpen, open }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={"subtitle-setting-controller"}
      style={ControllerStyle(open)}
    >
      <span>{text[lang]}</span>
      <IconButton style={CloseIconPosition} onClick={handleClose}>
        <CloseIcon style={CloseIconStyle} />
      </IconButton>
      <FontSizeController selectedLanguage={lang} />
      <SubtitlePositionController selectedLanguage={lang} />
    </div>
  );
};

const ControllerStyle = (open) => ({
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  width: "35%",
  height: "100vh",
  position: "fixed",
  top: "0",
  right: open ? "0" : "-35%",
  display: "flex",
  flexDirection: "column",
  zIndex: "1",
  transition: "right 0.5s ease",
  color: "whitesmoke",
  fontSize: "1.5em",
});

const CloseIconStyle = {
  cursor: "pointer",
  color: "whitesmoke",
};

const CloseIconPosition = {
  position: "absolute",
  top: "5%",
  left: "26px",
};

const ButtonStyle = {
  position: "fixed",
  top: "10px",
  right: "10px",
};

const IconStyle = {
  fontSize: "1.3em",
  color: "whitesmoke",
  cursor: "pointer",
};

export default MobileMenu;
