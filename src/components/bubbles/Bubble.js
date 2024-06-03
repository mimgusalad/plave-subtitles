import nameConverter from "../../utils/nameConverter";
import splitAndReformat from "../../utils/splitAndReformat";

function Bubble({ message: line, showTail, isBordered, showNameTag }) {
  const borderColors = {
    yejun: ["#8fb3d4", "#c8e3ff"],
    noah: ["#a169a3", "#f5c9f2"],
    bamby: ["#e4789d", "#ffccff"],
    eunho: ["#da4335", "#ff9999"],
    hamin: ["#19191c", "#52e64b"],
    default: ["#ffccff", "#ffccff"],
  };

  // type별 기본스타일
  const baseStyle1 = {
    backgroundColor: "snow",
    borderRadius: "1.1em",
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
    wordWrap: "break-word",
    position: "relative",
    margin: "0.2em 0",
    fontSize: "1em",
  };

  const blackStyle = ({ isBordered, name, borderColors }) => ({
    ...baseStyle1,
    padding: isBordered ? "0.05em 0.8em 0.05em 0" : "0 0.8em 0 0",
    outline: isBordered
      ? `0.1em solid ${
          borderColors[name] === undefined ? "white" : borderColors[name][0]
        }`
      : `0.11em solid snow`,
    outlineOffset: isBordered ? "-0.2em" : "0",
  });

  const result = splitAndReformat(line);
  const name = nameConverter(result.speaker);
  const speakerImage = name === result.speaker ? "default.png" : `${name}.png`;
  return (
    <>
      {result.speaker ? (
        <div
          className="chat-bubble-container"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon image={speakerImage} name={result.speaker} />
          <div
            className="chat-bubble"
            style={blackStyle(isBordered, name, borderColors)}
          >
            <SpeakerLabel
              showNameTag={showNameTag}
              name={result.speaker}
              borderColors={borderColors}
            />
            <Dialog // tail도 여기서 처리
              colors={borderColors}
              name={result.speaker}
              dialog={result.dialog}
              tail={showTail}
            />
          </div>
        </div>
      ) : (
        <DefaultChatBubble dialog={line} />
      )}
    </>
  );
}

const Icon = (image, name, type) => {
  const iconStyleBlack = (name) => ({
    position: "absolute",
    width: "fit-content",
    left: name ? "-0.33" : "-0.31em", // 이름 있으면 왼쪽으로 조금 더
    top: "-0.59em",
    zIndex: "1",
  });

  const iconStyleWhite = (tail) => ({
    position: "absolute",
    width: "fit-content",
    left: tail ? "-1.7em" : "-0.31em",
    top: tail ? "-0.45em" : "-0.59em",
    zIndex: "1",
  });

  const style = {
    black: iconStyleBlack,
    white: iconStyleWhite,
  };

  return (
    <i className="icon" style={style[type]}>
      <img
        src={process.env.PUBLIC_URL + "/img/symbol/" + image}
        style={{
          height: `${nameConverter(name) === "eunho" ? "2.68em" : "2.65em"}`,
        }}
      />
    </i>
  );
};

const Dialog = (name, dialog, tail) => {
  return (
    <>
      <span className="speech" style={{ color: "black", flex: "1" }}>
        {/*  flex 뭐지 왜있지 */}
        {dialog}
      </span>
      {tail && (
        <span
          className="tail"
          style={{
            position: "absolute",
            left: "-0.1em",
            bottom: "-0.4em",
            zIndex: "-1",
          }}
        >
          <img
            src={`/img/tail/${nameConverter(name)}_tail.png`}
            style={{
              width: "1em",
            }}
          />
        </span>
      )}
    </>
  );
};

const SpeakerLabel = (showNameTag, name, borderColors) => {
  const speakerLabelStyle1 = {
    color: "black",
    marginLeft: "1.3em",
    paddingLeft: "0",
  };

  // gap용 스타일, 실제로는 이름 안들어감
  const speakerLabelStyle2 = {
    color: "black",
    marginLeft: "1.4em",
    paddingLeft: "0",
  };
  return (
    <>
      {showNameTag ? (
        <>
          <span class="speaker-label" style={speakerLabelStyle1}>
            {name}
            <span
              class="separator"
              style={Separator(borderColors[nameConverter(name)][1])}
            >
              ㅣ
            </span>
          </span>
        </>
      ) : (
        <span class="speaker-label" style={speakerLabelStyle2}></span>
      )}
    </>
  );
};

const DefaultChatBubble = (dialog) => {
  const style = {
    backgroundColor: "snow",
    borderRadius: "1.1em",
    padding: "0 1em",
    display: "flex",
    alignItems: "center",
    maxWidth: "80vw",
    minWidth: "100%",
    wordBreak: "break-all",
    border: `0.11em solid snow`,
    boxShadow: `0 0 0 0.11em snow`,
    position: "relative",
    fontSize: "1em",
    textAlign: "center",
  };
  const dialogStyle = {
    color: "black",
    flex: "1",
  };
  return (
    <div
      className="chat-bubble-container-default"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="chat-bubble-default" style={style}>
        <span className="speech" style={dialogStyle}>
          {splitAndReformat(dialog)}
        </span>
      </div>
    </div>
  );
};

export { Icon };
