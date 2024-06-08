import { useEffect } from "react";
import {
  BlackFont,
  BlackFont2,
  BlackFontWithName,
  BlackFontWithName2,
  WhiteFont,
  WhiteFontWithName,
  WhiteFontWithTail,
  WhiteFontWithTail2,
} from "../Bubble_index";

function SubtitleTypeController({ handleTypeChange, lang }) {
  const paragraphs = document.querySelectorAll(".for-test .speaker-label");
  const regex = /(예준|노아|밤비|은호|하민|Name|名前|이름)/g;

  useEffect(() => {
    paragraphs.forEach((paragraph) => {
      const text3 = paragraph.textContent;
      const replacedText = text3.replace(regex, text2[lang]);
      paragraph.textContent = replacedText;
    });
  }, [lang]); // Run effect when lang changes

  return (
    <ul className="for-test">
      <li onClick={() => handleTypeChange("b")}>
        <span
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "0.1em 0.5em",
            color: "snow",
          }}
        >
          {basicText[lang]}
        </span>
      </li>
      <li onClick={() => handleTypeChange("1")}>
        <BlackFont message={text[lang][0]} />
      </li>
      <li onClick={() => handleTypeChange("6")}>
        <BlackFont2 message={text[lang][1]} />
      </li>
      <li onClick={() => handleTypeChange("2")}>
        <WhiteFont message={text[lang][4]} />
      </li>
      <li onClick={() => handleTypeChange("7")}>
        <WhiteFontWithTail message={text[lang][6]} />
      </li>
      <li onClick={() => handleTypeChange("4")}>
        <WhiteFontWithTail2 message={text[lang][7]} />
      </li>
      <li onClick={() => handleTypeChange("5")}>
        <WhiteFontWithName message={text[lang][5]} />
      </li>
      <li onClick={() => handleTypeChange("8")}>
        <BlackFontWithName2 message={text[lang][3]} />
      </li>
      <li onClick={() => handleTypeChange("3")}>
        <BlackFontWithName message={text[lang][2]} />
      </li>
    </ul>
  );
}

export default SubtitleTypeController;

const text = {
  en: [
    "[예준] Text",
    "[노아] Text",
    "[밤비] Text",
    "[은호] Text",
    "[하민] Text",
    "[예준] Text",
    "[밤비] Text",
    "[하민] Text",
  ],
  ko: [
    "[예준] 텍스트",
    "[노아] 텍스트",
    "[밤비] 텍스트",
    "[은호] 텍스트",
    "[하민] 텍스트",
    "[예준] 텍스트",
    "[밤비] 텍스트",
    "[하민] 텍스트",
  ],
  ja: [
    "[예준] テキスト",
    "[노아] テキスト",
    "[밤비] テキスト",
    "[은호] テキスト",
    "[하민] テキスト",
    "[예준] テキスト",
    "[밤비] テキスト",
    "[하민] テキスト",
  ],
};

const basicText = {
  en: "Text",
  ko: "텍스트",
  ja: "テキスト",
};

const text2 = {
  en: "Name",
  ko: "이름",
  ja: "名前",
};
