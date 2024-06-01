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
  const speakerImage = `${nameConverter(result.speaker)}.png`;

  return (
    <>
      {result.speaker ? (
        <div class="chat-bubble-container" style={BubbleContainer}>
          <i class="icon" style={IconStyle}>
            <img
              // src={`/img/symbol/${nameConverter(result.speaker)}.png`}
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
            class="chat-bubble"
            style={ChatBubble(colors, nameConverter(result.speaker))}
          >
            <span class="speaker-label" style={SpeakerLabel}></span>
            <span class="speech" style={Speech}>
              {result.dialog}
            </span>
          </div>
        </div>
      ) : (
        <div class="chat-bubble-container-default" style={BubbleContainer}>
          <div class="chat-bubble-default" style={DefaultChatBubble(colors)}>
            <span class="speech" style={Speech}>
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
  // transform: "translate(-70%, 25%)", // 'translate(-50%, -50%)
  left: "-0.5em",
  top: "-0.59em", // -0.5em
  zIndex: "1",
};

const ChatBubble = (colors, speaker) => ({
  backgroundColor: "snow",
  borderRadius: "1.1em",
  padding: "0.01em 0.8em 0.01em 0",
  display: "flex",
  alignItems: "center",
  maxWidth: "100%",
  wordWrap: "break-word",
  outline: `0.1em solid ${colors[speaker][0]}`,
  outlineOffset: "-0.2em",
  // border: `0.15em solid ${colors[speaker][1]}`,
  // boxShadow: `0 0 0 0.1em ${colors[speaker][1]}`,
  position: "relative",
  margin: "0.2em 0",
  fontSize: "1em",
});

const DefaultChatBubble = (colors) => ({
  backgroundColor: "snow",
  borderRadius: "1.1em",
  padding: "0 1em",
  display: "flex",
  alignItems: "center",
  maxWidth: "80vw",
  minWidth: "100%",
  wordBreak: "break-all",
  // border: `0.11em solid snow`,
  // boxShadow: `0 0 0 0.11em snow`,
  position: "relative",
  fontSize: "1em",
  textAlign: "center",
});

const SpeakerLabel = {
  color: "black",
  marginLeft: "1.4em",
  paddingLeft: "0",
};

const Speech = {
  color: "black",
  flex: "1",
};
