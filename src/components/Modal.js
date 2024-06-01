import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, Chip, IconButton } from "@mui/material";
import { useState } from "react";
import { additionalText, confirmText, sampleSubtitle, title } from "../locale";
import {
  BlackFont,
  BlackFont2,
  BlackFontWithName,
  BlackFontWithName2,
  WhiteFont,
  WhiteFontWithName,
  WhiteFontWithTail,
  WhiteFontWithTail2,
} from "./Bubbles";

function Modal({ handleModalClose, handleConfirm, lang }) {
  const [selected, setSelected] = useState(localStorage.getItem("type") || "a");
  const items = ["b1", "w1", "b3", "w4", "w2", "b2", "b4", "w3"];

  const handleChange = (item) => {
    setSelected(item);
  };

  const getMessageComponent = (index) => {
    const components = [
      <BlackFont message={sampleSubtitle[lang][0]} />, //yejun
      <WhiteFont message={sampleSubtitle[lang][4]} />, //hamin
      <BlackFontWithName message={sampleSubtitle[lang][2]} />, //noah
      <WhiteFontWithTail2 message={sampleSubtitle[lang][7]} />, //bamby
      <WhiteFontWithName message={sampleSubtitle[lang][5]} />, //eunho
      <BlackFont2 message={sampleSubtitle[lang][1]} />, //yejun
      <BlackFontWithName2 message={sampleSubtitle[lang][3]} />, //hamin
      <WhiteFontWithTail message={sampleSubtitle[lang][6]} />, //eunho
    ];
    return components[index];
  };

  const DefaultType = ({ message, type }) => {
    return (
      <>
        <IconButton
          disableFocusRipple
          disableRipple
          onClick={() => handleChange(type)}
          style={{ padding: "0", margin: "0", borderRadius: "0" }}
        >
          <div
            style={{
              backgroundColor: type === "b" ? "rgb(0,0,0,0.7)" : "",
              color: "white",
              padding: "0.1em",
              minWidth: "max-content",
              fontSize: "0.9em",
            }}
          >
            {message}
          </div>
        </IconButton>
        <FavoriteIcon
          sx={{
            color: `${selected === type ? "wheat" : "transparent"}`,
            margin: "0",
            padding: "0",
            zIndex: 1,
            position: "absolute",
            right: "-11%",
            transform: "translateY(-30%)",
          }}
        />
      </>
    );
  };

  return (
    <div className="modal-screen">
      <div className="modal-close>">
        <ModalClose handleModalClose={handleModalClose} />
      </div>
      <div className="modal-container">
        <h1>{title[lang].toUpperCase()}</h1>
        <ul className="type-container">
          {items.map((item, index) => (
            <li key={index}>
              <Button
                disableFocusRipple
                disableRipple
                onClick={() => handleChange(item)}
                style={{
                  padding: "0",
                  margin: "0",
                }}
              >
                {getMessageComponent(index)}
                <FavoriteIcon
                  sx={{
                    color: `${selected === item ? "wheat" : "transparent"}`,
                    margin: "0",
                    padding: "0",
                    zIndex: 1,
                    position: "absolute",
                    right: "7%",
                    transform: "translateY(-50%)",
                  }}
                />
              </Button>
            </li>
          ))}
          <li>
            {DefaultType({ message: sampleSubtitle[lang][9], type: "a" })}
          </li>
          <li>
            {DefaultType({ message: sampleSubtitle[lang][10], type: "b" })}
          </li>
        </ul>

        <span style={{ color: "snow" }}>{additionalText[lang]}</span>
        <Chip
          clickable
          onClick={() => handleConfirm(selected)}
          label={confirmText[lang]}
          style={{
            position: "relative",
            backgroundColor: "snow",
            color: "black",
            fontWeight: "500",
            fontSize: "1.5em",
            marginTop: "1em",
            padding: "0.8em 0.5em",
          }}
        />
      </div>
    </div>
  );
}
export default Modal;

function ModalClose({ handleModalClose }) {
  return (
    <>
      <IconButton
        onClick={handleModalClose}
        style={{
          top: "10px",
          right: "10px",
          position: "absolute",
        }}
      >
        <CloseIcon
          style={{
            top: "10px",
            right: "10px",
            color: "white",
            backgroundColor: "tomato",
          }}
        />
      </IconButton>
    </>
  );
}
