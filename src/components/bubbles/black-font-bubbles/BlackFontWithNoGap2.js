function splitAndReformat(line) {
  // Use regular expression to match the speaker and dialog
  const match = line.match(/^\[(.+?)\]\s*(.+)$/);
  if (match) {
    const speaker = match[1];
    const dialog = match[2];
    // Check if the speaker contains a slash
    if (speaker.indexOf("/") !== -1) return dialog;
    return { speaker, dialog };
  } else {
    return line;
  }
}

function nameConverter(name) {
  const names = {
    en: ["Yejun", "Noah", "Bamby", "Eunho", "Hamin"],
    ko: ["예준", "노아", "밤비", "은호", "하민"],
    ja: ["イェジュン", "ノア", "バンビ", "ウノ", "ハミン"],
  };

  let index = names.en.indexOf(name);
  if (index === -1) {
    index = names.ko.indexOf(name);
  }
  if (index === -1) {
    index = names.ja.indexOf(name);
  }

  if (index !== -1) {
    return names.en[index].toLowerCase();
  } else {
    return null; // Or any default value you'd like to return if the name is not found
  }
}
function BlackFontWithNoGap2({ message: line }) {
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
                width: "2.8em",
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

export default BlackFontWithNoGap2;

const BubbleContainer = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const IconStyle = {
  position: "absolute",
  width: "fit-content",
  // transform: "translate(-70%, 25%)", // 'translate(-50%, -50%)
  left: "-1em",
  top: "-0.3em", // -0.5em
  zIndex: "1",
};

const DefaultChatBubble = (colors) => ({
  backgroundColor: "snow",
  borderRadius: "1.1em",
  padding: "0 1em",
  display: "flex",
  alignItems: "center",
  maxWidth: "80vw",
  minWidth: "100%",
  wordBreak: "keep-all",
  border: `0.11em solid snow`,
  position: "relative",
  fontSize: "1em",
  textAlign: "center",
});

const ChatBubble = (colors, speaker) => ({
  backgroundColor: "snow",
  borderRadius: "1.1em",
  padding: "0 1em 0 0",
  display: "flex",
  alignItems: "center",
  maxWidth: "100%",
  wordWrap: "break-word",
  border: `0.15em solid snow`,
  position: "relative",
  margin: "0.2em 0",
  fontSize: "1em",
});

const SpeakerLabel = {
  color: "black",
  marginLeft: "1.4em",
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
