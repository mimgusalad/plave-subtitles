import nameConverter from "../../utils/nameConverter";
import splitAndReformat from "../../utils/splitAndReformat";

function BlackFont({ message: line }) {
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
  const speakerImage =
    name === result.speaker ? "default.avif" : `${name}.avif`;

  return (
    <>
      {result.speaker ? (
        <div className="chat-bubble-container" style={BubbleContainer}>
          <i className="icon" style={IconStyle}>
            <img
              alt="symbol"
              src={process.env.PUBLIC_URL + "/img/symbol/" + speakerImage}
              style={{
                height: `${
                  nameConverter(result.speaker) === "eunho" ? "3em" : "3em"
                }`,
              }}
            />
          </i>
          <div
            className="chat-bubble"
            style={ChatBubble(colors, nameConverter(result.speaker))}
          >
            <span className="speaker-label" style={SpeakerLabel}></span>
            <span className="speech" style={Speech}>
              {result.dialog}
            </span>
          </div>
        </div>
      ) : (
        <div className="chat-bubble-container-default" style={BubbleContainer}>
          <div
            className="chat-bubble-default"
            style={DefaultChatBubble(colors)}
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

export default BlackFont;

const BubbleContainer = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const IconStyle = {
  position: "absolute",
  width: "fit-content",
  left: "-0.8em",
  top: "-0.8em",
  zIndex: "1",
};

const ChatBubble = (colors, speaker) => ({
  backgroundColor: "snow",
  borderRadius: "1.1em",
  display: "flex",
  alignItems: "center",
  maxWidth: "100vw",
  wordWrap: "break-word",
  position: "relative",
  margin: "0.2em 0",

  padding: "3px 1em 3px 1.2em",
  outline: `0.1em solid ${
    colors[speaker] === undefined ? "white" : colors[speaker][0]
  }`,
  outlineOffset: "-0.2em",
});

const SpeakerLabel = {
  color: "black",
  // marginLeft: "1.4em",
  paddingLeft: "0",
};

const Speech = {
  color: "black",
  flex: "1",
};
const DefaultChatBubble = (colors) => ({
  backgroundColor: "snow",
  borderRadius: "1.1em",
  padding: "0 1em",
  display: "flex",
  alignItems: "center",
  maxWidth: "100vw",
  wordBreak: "break-all",
  position: "relative",
  textAlign: "center",
});
