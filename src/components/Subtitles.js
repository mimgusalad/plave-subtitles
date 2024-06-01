import { useEffect, useState } from "react";
import {
  BlackFont,
  BlackFont2,
  BlackFontWithName,
  BlackFontWithName2,
  WhiteFont,
  WhiteFontWithName,
  WhiteFontWithTail,
  WhiteFontWithTail2,
} from "./Bubbles";

function Subtitles({ subtitles }) {
  const items = ["b1", "w1", "b3", "w4", "w2", "b2", "b4", "w3"];
  // "b1", "b2", "b3", "b4", "w1", "w2", "w3", "w4"]

  // const suibtitles = {
  //   b1: <BlackFont message={sampleSubtitle[lang][0]} />,
  //   w1: <WhiteFont message={sampleSubtitle[lang][4]} />,
  //   b3: <BlackFontWithName message={sampleSubtitle[lang][2]} />,
  //   w4: <WhiteFontWithTail2 message={sampleSubtitle[lang][7]} />,
  //   w2: <WhiteFontWithName message={sampleSubtitle[lang][5]} />,
  //   b2: <BlackFont2 message={sampleSubtitle[lang][1]} />,
  //   b4: <BlackFontWithName2 message={sampleSubtitle[lang][3]} />,
  //   w3: <WhiteFontWithTail message={sampleSubtitle[lang][6]} />,
  // };

  const [type, setType] = useState(localStorage.getItem("type"));

  useEffect(() => {
    const handleStorageChange = () => {
      setType(localStorage.getItem("type"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const subtitleElement =
      document.getElementsByClassName("subtitle-container")[0];
    if (subtitleElement && localStorage.getItem("type") === "b") {
      subtitleElement.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      subtitleElement.style.padding = "0.1em 0.5em";
    } else if (subtitleElement) {
      subtitleElement.style.backgroundColor = "";
      subtitleElement.style.padding = "";
    }
  }, [localStorage.getItem("type")]);

  return (
    <>
      {subtitles.map((line, index) => {
        const trimmedLine = line.trim();
        switch (type) {
          case "b1":
            return <BlackFont key={index} message={trimmedLine} />;
          case "w1":
            return <WhiteFont key={index} message={trimmedLine} />;
          case "b3":
            return <BlackFontWithName key={index} message={trimmedLine} />;
          case "w4":
            return <WhiteFontWithTail2 key={index} message={trimmedLine} />;
          case "w2":
            return <WhiteFontWithName key={index} message={trimmedLine} />;
          case "b2":
            return <BlackFont2 key={index} message={trimmedLine} />;
          case "b4":
            return <BlackFontWithName2 key={index} message={trimmedLine} />;
          case "w3":
            return <WhiteFontWithTail key={index} message={trimmedLine} />;
          default:
            return trimmedLine;
        }
      })}
    </>
  );
}

export default Subtitles;
