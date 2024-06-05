import { isMobile, isTablet } from "react-device-detect";
import nameConverter from "../../utils/nameConverter";
import splitAndReformat from "../../utils/splitAndReformat";

function WhiteFontWithTail({ message: line }) {
  const colors = {
    yejun: ["#8fb3d4", "#c8e3ff"],
    noah: ["#a169a3", "#f5c9f2"],
    bamby: ["#e4789d", "#ffccff"],
    eunho: ["#da4335", "#ff9999"],
    hamin: ["#19191c", "#52e64b"],
    default: ["#ffccff", "#ffccff"],
  };

  const result = splitAndReformat(line);
  const name = nameConverter(result.speaker);
  const speakerImage = name === result.speaker ? "default.png" : `${name}.png`;

  return (
    <>
      {result.speaker ? (
        <div className="chat-bubble-container" style={BubbleContainer}>
          <i className="icon" style={IconStyle}>
            <img
              src={process.env.PUBLIC_URL + "/img/symbol/" + speakerImage}
              style={{
                height: `${
                  nameConverter(result.speaker) === "eunho"
                    ? "2.68em"
                    : "2.65em"
                }`,
              }}
            />
          </i>
          <div
            className="chat-bubble"
            style={ChatBubble(
              colors,
              nameConverter(result.speaker),
              isMobile && !isTablet
            )}
          >
            <span className="speech" style={Speech}>
              {result.dialog}
            </span>
            <span className="tail" style={TailStyle}>
              <img
                src={`/img/tail/${nameConverter(result.speaker)}_tail.png`}
                style={{
                  width: "1em",
                }}
              />
            </span>
          </div>
        </div>
      ) : (
        <div className="chat-bubble-container-default" style={BubbleContainer}>
          <div
            className="chat-bubble-default"
            style={DefaultChatBubble(colors, isMobile & !isTablet)}
          >
            <span className="speech" style={Speech}>
              {splitAndReformat(line)}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default WhiteFontWithTail;

const TailStyle = {
  position: "absolute",
  left: "-0.1em", // "-0.5em",
  bottom: "-0.4em", // "-0.5em",
  zIndex: "-1",
};

const BubbleContainer = {
  position: "relative",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
};

const IconStyle = {
  position: "absolute",
  width: "fit-content",
  left: "-1.7em",
  top: "-0.45em", // -0.5em
};

const DefaultChatBubble = (colors, isMobile) => ({
  backgroundColor: "rgb(0,0,0,0.8)",
  borderRadius: "1.1em",
  padding: "0 1em",
  alignItems: "center",
  maxWidth: "100vw",
  wordBreak: "break-all",
  border: `0.1em solid rgb(0,0,0,0.8)`,
  position: "relative",
  fontSize: "1em",
  textAlign: "center",
});

const ChatBubble = (colors, speaker, isMobile) => ({
  backgroundColor: colors[speaker][0],
  borderRadius: "1.1em",
  padding: "0 0.8em",
  display: "flex",
  alignItems: "center",
  maxWidth: "100vw",
  wordWrap: "break-word",
  position: "relative",
  margin: "0.2em 0",
  fontSize: "1em",
  zIndex: "2",
});

const Speech = {
  color: "black",
  flex: "1",
  color: "snow",
};
