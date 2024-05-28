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
