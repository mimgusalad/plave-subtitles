import CancelIcon from "@mui/icons-material/Cancel";
import { Box, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import secondsToHms from "../utils/secondsToHms";

function Form({ rotation, videoId, timecode, lang }) {
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [formData, setFormData] = useState({
    Timestamp: "",
    VideoId: "",
    Timecode: "",
    Message: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      Timestamp: new Date().toLocaleString(),
      VideoId: videoId,
      Timecode: secondsToHms(timecode),
      Message: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    fetch(
      "https://script.google.com/macros/s/AKfycbzvwiuDkdY_co4Wbmec0Mh-JSHxx2HFsDcj5VloDhaYN1i0y_rgygpkLawGw3iSKELAng/exec",
      {
        method: "POST",
        body: JSON.stringify(formData),
        mode: "no-cors",
      }
    );

    const form = document.getElementById("form");
    form.reset();

    setFormData({
      Timestamp: new Date().toLocaleString(),
      VideoId: videoId,
      Timecode: timecode,
      Message: "",
    });

    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => {
      setIsSubmitted(true);
      toast.classList.remove("show");
      const element = document.getElementById("form-button");
      element.style.display = "";
    }, 1000);
  };

  const handleCancel = () => {
    setIsSubmitted(true);
    setIsOpen(false);
  };

  const toggleForm = () => {
    setIsSubmitted(!isSubmitted);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const formContainer = document.getElementsByClassName(
      "mobile-form-container"
    )[0];
    if (isOpen) {
      formContainer.style.zIndex = "10";
    } else {
      formContainer.style.zIndex = "-1";
    }
  }, [isOpen]);

  useEffect(() => {
    const formContainer = document.getElementsByClassName(
      "mobile-form-container"
    )[0];
    if (isMobile && !isTablet) {
      if (rotation === "1") {
        formContainer.style.transform = "rotate(90deg)";
      } else {
        formContainer.style.transform = "rotate(-90deg)";
      }
    }
  }, [rotation]);
  return (
    <>
      <button id="form-button" style={FormButtonStyle} onClick={toggleForm}>
        🔔
      </button>
      <div
        className={`${isMobile && !isTablet ? "mobile-" : ""}form-container`}
      >
        {!isSubmitted && (
          <StyledBox>
            <form id="form" style={FormStyle} onSubmit={handleSubmit}>
              <input type="hidden" name="VideoId" value={formData.VideoId} />
              <input type="hidden" name="Timecode" value={formData.Timecode} />
              <input
                type="hidden"
                name="Timestamp"
                value={formData.Timestamp}
              />
              <input type="hidden" name="Message" value={formData.Message} />
              <span id="form-title" style={TitleStyle}>
                🔔 {titleText[lang]} 🔔
              </span>{" "}
              <span style={{ fontSize: "14px" }}>
                {currentText[lang]} : {secondsToHms(timecode)}
              </span>
              <button
                type="reset"
                className="close-icon"
                style={CloseIconStyle}
              >
                <CancelIcon
                  onClick={handleCancel}
                  fontSize="large"
                  sx={{
                    color: "#black",
                    backgroundColor: "snow",
                    borderRadius: "50px",
                  }}
                />
              </button>
              <TextField
                multiline
                fullWidth
                required
                rows={4}
                style={{ margin: "1em" }}
                placeholder={informationText[lang]}
                onChange={handleChange}
                // value={formData.Message}
              />
              <button type="submit" style={ButtonStyle}>
                {submitText[lang]}
              </button>
            </form>
          </StyledBox>
        )}
        <span id="toast">{feedbackText[lang]}</span>
      </div>
    </>
  );
}

export default Form;

const FormButtonStyle = {
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontSize: "1.3em",
};

const FormStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

const CloseIconStyle = {
  position: "absolute",
  top: "-4%",
  right: "-4%",
  cursor: "pointer",
  filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))",
  border: "none",
  backgroundColor: "transparent",
};

const TitleStyle = {
  textAlign: "center",
  fontSize: "1.3em",
  marginTop: "5px",
  marginBottom: "16px",
  width: "100%",
  fontWeight: "bold",
};

const ButtonStyle = {
  color: "snow",
  fontSize: "1em",
  width: "fit-content",
  fontWeight: "400",
  borderRadius: "10px",
  cursor: "pointer",
  textAlign: "center",
  zIndex: "10",
  padding: "5px 1em",
  filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))",
  border: "none",
  color: "black",
  fontWeight: "400",
};

const StyledBox = styled(Box)({
  padding: "1em",
  borderRadius: "20px",
  backgroundColor: "#f5f5f5",
  maxWidth: "450px",
  minWidth: "300px",
  color: "black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
});

const titleText = {
  en: "If you have any problems with the subtitles, please let us know",
  ko: "자막에 문제가 있다면 알려주세요",
  ja: "字幕に問題があれば教えてください",
};

const submitText = {
  en: "Submit",
  ko: "제출",
  ja: "提出",
};

const feedbackText = {
  en: "Thank you for your feedback!",
  ko: "피드백 감사합니다!",
  ja: "フィードバックありがとうございます！",
};

const informationText = {
  en: "Submitted anonymously",
  ko: "익명으로 제출됩니다",
  ja: "匿名で提出されます",
};

const currentText = {
  en: "Current",
  ko: "현재",
  ja: "現在",
};
