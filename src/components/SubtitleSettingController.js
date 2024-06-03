import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { informationText, sampleText } from "../locale";
import {
  BlackFont,
  BlackFont2,
  BlackFontWithName,
  BlackFontWithName2,
  WhiteFont,
  WhiteFontWithName,
  WhiteFontWithTail,
  WhiteFontWithTail2,
} from "./Bubble_index";

const SubtitleSettingController = ({ lang }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(localStorage.getItem("type") || "a");
  const items = ["b1", "w1", "b3", "w4", "w2", "b2", "b4", "w3"];

  const handleChange = (item) => {
    setSelected(item);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSettingClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        disableRipple
        disableFocusRipple
        style={ButtonStyle}
        onClick={handleSettingClick}
      >
        {!open && <MenuIcon style={IconStyle} />}
      </IconButton>
      <div
        className={"subtitle-setting-controller"}
        style={TransitionStyle(open)}
      >
        <span>{informationText[lang]}</span>
        <IconButton
          disableRipple
          disableFocusRipple
          style={CloseIconPosition}
          onClick={handleClose}
        >
          <CloseIcon style={CloseIconStyle} />
        </IconButton>
      </div>
    </>
  );
};

const SubtitleTypes = ({ lang }) => {
  const items = ["b1", "w1", "b3", "w4", "w2", "b2", "b4", "w3"];

  return (
    <div className="subtitle-setting-controller-types">
      {items.map((item, index) => (
        <div className="test-container">{getMessageComponent(index, lang)}</div>
      ))}
    </div>
  );
};

const getMessageComponent = (index, lang) => {
  const components = [
    <BlackFont message={sampleText[lang][index]} />,
    <WhiteFont message={sampleText[lang][index]} />,
    <BlackFontWithName message={sampleText[lang][index]} />,
    <WhiteFontWithTail2 message={sampleText[lang][index]} />,
    <WhiteFontWithName message={sampleText[lang][index]} />,
    <BlackFont2 message={sampleText[lang][index]} />,
    <BlackFontWithName2 message={sampleText[lang][index]} />,
    <WhiteFontWithTail message={sampleText[lang][index]} />,
  ];
  return components[index];
};

const TransitionStyle = (open) => ({
  right: open ? "0" : "-35%",
});

const CloseIconStyle = {
  cursor: "pointer",
  color: "snow",
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
  color: "snow",
  cursor: "pointer",
};

export default SubtitleSettingController;
