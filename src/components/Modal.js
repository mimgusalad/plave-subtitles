import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
import { Chip } from "@mui/material";
import { useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { additionalText, confirmText, sampleSubtitle, title } from "../locale";
import { leftHandRotation, rightHandRotation } from "../utils/changeRotation";
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
import Home from "./HomeButton";

function Modal({ handleConfirm, lang }) {
  const [selected, setSelected] = useState(localStorage.getItem("type"));
  const [isMounted, setIsMounted] = useState(true);
  const [rotate, setRotate] = useState(sessionStorage.getItem("rotate") || "0"); // righthand: 0, lefthand: 1
  const items = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const handleRotate = () => {
    if (rotate === "0") {
      setRotate("1");
      leftHandRotation();
      sessionStorage.setItem("rotate", "1");
    } else {
      setRotate("0");
      rightHandRotation();
      sessionStorage.setItem("rotate", "0");
    }
  };

  const handleClick = (item) => {
    setSelected(item);
  };

  const handleConfirmButton = (selected) => {
    setIsMounted(false);
    handleConfirm(selected);
  };

  const getMessageComponent = (index) => {
    const components = [
      <BlackFont message={sampleSubtitle[lang][0]} />, //yejun
      <WhiteFont message={sampleSubtitle[lang][4]} />, //hamin
      <BlackFontWithName message={sampleSubtitle[lang][2]} />, //noah
      <WhiteFontWithTail2 message={sampleSubtitle[lang][7]} />, //bamby
      <WhiteFontWithName message={sampleSubtitle[lang][5]} />, //eunho
      <BlackFont2 message={sampleSubtitle[lang][1]} />, //yejun
      <WhiteFontWithTail message={sampleSubtitle[lang][6]} />, //eunho
      <BlackFontWithName2 message={sampleSubtitle[lang][3]} />, //hamin
    ];
    return components[index];
  };

  const DefaultType = ({ message, type }) => {
    return (
      <div
        className={`default-type-button ${selected === type ? "selected" : ""}`}
        onClick={() => handleClick(type)}
        style={{
          backgroundColor: type === "b" ? "rgb(0,0,0,0.7)" : "",
          color: "white",
          padding: "0 0.5em",
          minWidth: "max-content",
          fontSize: "1em",
          cursor: "pointer",
        }}
      >
        {message}
      </div>
    );
  };

  return (
    <div
      className={`modal-screen${isMobile && !isTablet ? "-mobile" : ""} ${
        isMounted ? "mounted" : "unmounted"
      }`}
    >
      <Home />
      {isMobile && !isTablet && (
        <span id="rotate-button" onClick={handleRotate}>
          <ScreenRotationIcon
            style={{ color: "snow", fontSize: "1.5em", cursor: "pointer" }}
          />
        </span>
      )}
      <div
        className={`modal-container${isMobile && !isTablet ? "-mobile" : ""}`}
      >
        <h1>{title[lang].toUpperCase()}</h1>
        <ul
          className={`type-container${isMobile && !isTablet ? "-mobile" : ""}`}
        >
          {items.map((item, index) => (
            <li
              className={`type-button ${selected === item ? "selected" : ""}`}
              key={index}
              onClick={() => handleClick(item)}
            >
              {getMessageComponent(index)}
            </li>
          ))}
          <li>
            {DefaultType({ message: sampleSubtitle[lang][9], type: "b" })}
          </li>
        </ul>

        <span style={{ color: "snow" }}>{additionalText[lang]}</span>
        <Chip
          clickable
          onClick={() => handleConfirmButton(selected)}
          label={confirmText[lang]}
          style={{
            position: "relative",
            backgroundColor: "snow",
            color: "black",
            fontWeight: "500",
            fontSize: isMobile && !isTablet ? "1em" : "1em",
            marginTop: "1em",
            padding: "0 0.5em",
          }}
        />
      </div>
    </div>
  );
}
export default Modal;
