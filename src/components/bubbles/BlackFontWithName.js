import nameConverter from "../../utils/nameConverter";
import splitAndReformat from "../../utils/splitAndReformat";
function BlackFontWithName({ message: line }) {
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
        <div class="chat-bubble-container" style={BubbleContainer}>
          <i class="icon" style={IconStyle}>
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

export default BlackFontWithName;

const BubbleContainer = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const IconStyle = {
  position: "absolute",
  width: "fit-content",
  left: "-0.33em",
  top: "-0.59em", // -0.5em
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
  fontSize: "1em",

  padding: "0.05em 0.8em 0.05em 0",
  outline: `0.1em solid ${colors[speaker][0]}`,
  outlineOffset: "-0.2em",
});

const SpeakerLabel = {
  color: "black",
  marginLeft: "1.3em",
  paddingLeft: "0",
};

const Separator = (color) => ({
  color: color,
  position: "relative",
  fontSize: "1em",
});
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
  border: `0.11em solid snow`,
  boxShadow: `0 0 0 0.11em snow`,
  position: "relative",
  fontSize: "1em",
  textAlign: "center",
});
