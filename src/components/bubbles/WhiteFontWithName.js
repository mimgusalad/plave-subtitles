import nameConverter from "../../utils/nameConverter";
import splitAndReformat from "../../utils/splitAndReformat";
function WhiteFontWithName({ message: line }) {
  const colors = {
    yejun: ["#8fb3d4", "#c8e3ff"],
    noah: ["#a169a3", "#f5c9f2"],
    bamby: ["#e4789d", "#ffccff"],
    eunho: ["#da4335", "#ff9999"],
    hamin: ["#19191c", "#52e64b"],
    default: ["#ffccff", "#ffccff"],
  };

  const result = splitAndReformat(line);

  return (
    <>
      {result.speaker ? (
        <div class="chat-bubble-container" style={BubbleContainer}>
          <i class="icon" style={IconStyle}>
            <img
              src={`/img/symbol/${nameConverter(result.speaker)}.png`}
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
            <span class="speaker-label" style={SpeakerLabel}>
              {result.speaker}
              <span
                class="separator"
                style={Separator(colors[nameConverter(result.speaker)][1])}
              >
                ㅣ
              </span>
            </span>
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

export default WhiteFontWithName;

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
  backgroundColor: colors[speaker][0],
  borderRadius: speaker === "bamby" ? "1.1em 1.1em 1.1em 0" : "1.1em",
  padding: "0 1em 0 0",
  display: "flex",
  alignItems: "center",
  maxWidth: "100%",
  wordWrap: "break-word",
  // border: `0.08em solid ${colors[speaker][0]}`,
  // boxShadow: `0 0 0 0.15em ${colors[speaker][0]}`,
  position: "relative",
  margin: "0.2em 0",
  fontSize: "1em",
});

const SpeakerLabel = {
  color: "black",
  marginLeft: "1.4em",
  paddingLeft: "0",
  color: "snow",
};

const DefaultChatBubble = (colors) => ({
  backgroundColor: "rgb(0,0,0,0.8)",
  borderRadius: "1.1em",
  padding: "0 1em",
  display: "flex",
  alignItems: "center",
  maxWidth: "80vw",
  minWidth: "100%",
  wordBreak: "break-all",
  border: `0.11em solid rgb(0,0,0,0.8)`,
  position: "relative",
  fontSize: "1em",
  textAlign: "center",
});
const Separator = (color) => ({
  color: color,
  position: "relative",
  fontSize: "1em",
});
const Speech = {
  color: "black",
  flex: "1",
  color: "snow",
};
