import { useEffect, useState } from "react";
import { enterText } from "../locale";

function IntroPage({ handleClickEnter }) {
  const text = [enterText.en, enterText.ko, enterText.ja];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <div className="intro">
      <h1>Plave Subtitles</h1>
      <span>한국어 ㅣ English ㅣ 日本語 </span>
      <div className="enter-text" onClick={handleClickEnter}>
        <span>{text[index]}</span>
      </div>
    </div>
  );
}

export default IntroPage;
