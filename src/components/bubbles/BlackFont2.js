import nameConverter from "../../utils/nameConverter";
import splitAndReformat from "../../utils/splitAndReformat";

function BlackFont2({ message: line }) {
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

export default BlackFont2;

const BubbleContainer = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const IconStyle = {
  position: "absolute",
  width: "fit-content",
  left: "-0.31em",
  top: "-0.59em", // -0.5em
  zIndex: "1",
};

const ChatBubble = (colors, speaker) => ({
  backgroundColor: "snow",
  borderRadius: "1.1em",
  display: "flex",
  alignItems: "center",
  maxWidth: "100%",
  wordWrap: "break-word",
  position: "relative",
  margin: "0.2em 0",
  fontSize: "1em",

  padding: "0 0.8em 0 0",
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

const DefaultChatBubble = (colors) => ({
  backgroundColor: "snow",
  borderRadius: "1.1em",
  padding: "0 1em",
  display: "flex",
  alignItems: "center",
  maxWidth: "80vw",
  minWidth: "100%",
  wordBreak: "break-all",
  position: "relative",
  fontSize: "1em",
  textAlign: "center",
});
