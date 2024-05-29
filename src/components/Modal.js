import CloseIcon from "@mui/icons-material/Close";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Button, Chip, IconButton, styled } from "@mui/material";
import { useState } from "react";

const StyledButton = styled(Button)(({ selected }) => ({
  position: "relative",
  width: "25vh",
  height: "15vh",
  background: "none",
  overflow: "hidden",
  borderRadius: "20px",
  margin: "10px",
  backgroundColor: "white",
  boxShadow: "7px 7px 15px rgba(2,28,53,0.08)",
  "&:hover": {
    backgroundColor: "white",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.15em #f0b1c4",
  },
  boxShadow: selected ? "0 0 0 0.15em #f0b1c4" : "",
}));

const text = {
  en: "Subtitles here",
  ko: "자막이 여기에 표시됩니다",
  ja: "字幕はここに表示されます",
};

const title = {
  en: "🥤Select Subtitle Type🍿",
  ko: "🥤자막 유형 선택🍿",
  ja: "🥤字幕タイプを選択🍿",
};

const confirmText = {
  en: "Confirm",
  ko: "확인",
  ja: "確認",
};

function Modal({ handleModalClose, handleConfirm }) {
  const [checkedA, setCheckedA] = useState(true);
  const [checkedB, setCheckedB] = useState(false);

  const handleConfirmClick = () => {
    localStorage.setItem("subtitleType", checkedA ? 0 : 1);
    handleConfirm();
  };

  const handleAClick = () => {
    setCheckedA(true);
    setCheckedB(false);
  };
  const handleBClick = () => {
    setCheckedB(true);
    setCheckedA(false);
  };
  return (
    <div className="modal" style={modalBackgroundStyle}>
      <div style={outerBoxStyle("column")}>
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
              color: "black",
            }}
          />
        </IconButton>
        <h4
          style={{
            marginTop: "30px",
            marginBottom: "10px",
            fontWeight: "bold",
            color: "rgb(0,0,0,0.8)",
          }}
        >
          {title["en"]}
        </h4>
        <div style={outerBoxStyle("row")}>
          <StyledButton onClick={() => handleAClick()} selected={checkedA}>
            {!checkedA ? (
              <RadioButtonUncheckedIcon style={radioButtonStyle} />
            ) : (
              <RadioButtonCheckedIcon style={radioButtonStyle} />
            )}
            <img src="/img/type_a.png" style={imgStyle} />
            <span style={subStyle1}>{text["en"]}</span>
          </StyledButton>
          <StyledButton onClick={() => handleBClick()} selected={checkedB}>
            {!checkedB ? (
              <RadioButtonUncheckedIcon style={radioButtonStyle} />
            ) : (
              <RadioButtonCheckedIcon style={radioButtonStyle} />
            )}
            <img src="/img/live_bg.png" style={imgStyle2} />
            <span style={subStyle2}>{text["en"]}</span>
          </StyledButton>
        </div>
        <Chip
          clickable
          onClick={handleConfirmClick}
          label={confirmText["en"]}
          style={ChipStyle}
        />
      </div>
    </div>
  );
}
const modalBackgroundStyle = {
  width: "100vw",
  height: "100vh",
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
};

const radioButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  zIndex: "1",
  color: "#f0b1c4",
};

const ChipStyle = {
  backgroundColor: "#f0b1c4",
  color: "white",
  fontWeight: "bold",
  fontSize: "1em",
  marginTop: "20px",
  marginBottom: "30px",
  padding: "10px 20px",
  boxShadow: "7px 7px 15px rgba(2,28,53,0.08)",
};

const outerBoxStyle = (direction) => ({
  position: "relative",
  display: "inline-flex",
  flexDirection: direction,
  alignItems: "center",
  justifyContent: "center",
  height: "30vh",
  width: "calc(30vh * 2)",
  borderRadius: "20px",
  backgroundColor: "whitesmoke",
});

const imgStyle = {
  position: "absolute",
  width: "75%",
  top: "10%",
};

const imgStyle2 = {
  position: "absolute",
  width: "90%",
  top: "8%",
};

const subStyle1 = {
  position: "absolute",
  color: "rgb(0,0,0,0.9)",
  bottom: "10px",
};

const subStyle2 = {
  position: "absolute",
  color: "white",
  backgroundColor: "rgb(0,0,0,0.5)",
  padding: "0px 10px",
  bottom: "15%",
};

export default Modal;
