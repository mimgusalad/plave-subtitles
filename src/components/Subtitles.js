const SubtitleStyleB = {
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  textAlign: "center",
  padding: "10px",
};

function Subtitles({ subtitles }) {
  return (
    <>
      {subtitles.map((line, index) => (
        <div key={index}>{line.trim()}</div>
      ))}
    </>
  );
}

export default Subtitles;
