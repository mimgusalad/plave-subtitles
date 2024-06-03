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
        <div class="chat-bubble-container" style={BubbleContainer}>
          <i class="icon" style={IconStyle}>
            <img
              draggable="false"
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
            <span class="speech" style={Speech}>
              {result.dialog}
            </span>
            <span class="tail" style={TailStyle}>
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
  alignItems: "center",
};

const IconStyle = {
  position: "absolute",
  width: "fit-content",
  left: "-1.7em",
  top: "-0.45em", // -0.5em
};

const ChatBubble = (colors, speaker) => ({
  backgroundColor: colors[speaker][0],
  borderRadius: "1.1em",
  padding: "0.05em 0.8em",
  display: "flex",
  alignItems: "center",
  maxWidth: "100%",
  wordWrap: "break-word",
  // border: `0.1em solid snow`,
  // boxShadow: `0 0 0 0.15em ${colors[speaker][0]}`,
  outline: `0.09em solid snow`,
  outlineOffset: "-0.2em",
  boxShadow: `0 0 0 0.04em ${colors[speaker][0]}`,
  position: "relative",
  margin: "0.2em 0",
  fontSize: "1em",
  zIndex: "2",
});

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

const Speech = {
  color: "black",
  flex: "1",
  color: "snow",
};
