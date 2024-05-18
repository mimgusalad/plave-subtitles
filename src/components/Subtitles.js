function Subtitles({ subtitles }) {
  return (
    <div className="subtitle-container">
      {subtitles.map((line, index) => (
        <div key={index}>{line.trim()}</div>
      ))}
    </div>
  );
}

export default Subtitles;
