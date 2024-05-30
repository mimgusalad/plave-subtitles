import WhiteFontWithTail2 from "./bubbles/white-font-bubbles/WhiteFontWithTail2";
function Subtitles({ subtitles }) {
  // useEffect(() => {
  //   const subtitleElement =
  //     document.getElementsByClassName("subtitle-container")[0];
  //   subtitleElement.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  // }, [subtitles]);
  return (
    <>
      {subtitles.map((line, index) => (
        // // <div key={index}>{line.trim()}</div>
        // <Bubble1 key={index} speech={line.trim()} />
        <WhiteFontWithTail2 key={index} message={line.trim()} />
      ))}
    </>
  );
}

export default Subtitles;
