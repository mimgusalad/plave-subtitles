import {
  BlackFont,
  BlackFont2,
  BlackFontWithName,
  BlackFontWithName2,
  WhiteFont,
  WhiteFontWithName,
  WhiteFontWithTail,
  WhiteFontWithTail2,
} from "./Bubble_index";

function DisplaySubtitles({ subtitles, type }) {
  return (
    <>
      {subtitles.map((line, index) => {
        const trimmedLine = line.trim();
        switch (type) {
          case "1":
            return <BlackFont key={index} message={trimmedLine} />;
          case "2":
            return <WhiteFont key={index} message={trimmedLine} />;
          case "3":
            return <BlackFontWithName key={index} message={trimmedLine} />;
          case "4":
            return <WhiteFontWithTail2 key={index} message={trimmedLine} />;
          case "5":
            return <WhiteFontWithName key={index} message={trimmedLine} />;
          case "6":
            return <BlackFont2 key={index} message={trimmedLine} />;
          case "7":
            return <WhiteFontWithTail key={index} message={trimmedLine} />;
          case "8":
            return <BlackFontWithName2 key={index} message={trimmedLine} />;
          default:
            return (
              <div
                className="default-subtitle"
                style={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  padding: "0.1em 0.5em",
                  color: "white",
                  height: "fit-content",
                }}
              >
                {trimmedLine}
              </div>
            );
        }
      })}
    </>
  );
}

export default DisplaySubtitles;
