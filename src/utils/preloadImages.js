function PreloadImages({ videoData }) {
  const images = ["yejun", "noah", "bamby", "eunho", "hamin"];
  const imgUrl = (videoId) => {
    return "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
  };

  return (
    <div id="preload">
      {videoData.map((video) => (
        <img
          key={video.videoId}
          src={`https://mimgusalad.github.io/plave/thumbnail/${video.videoId}.avif`}
          alt="preload"
          style={{ display: "none" }}
          width={1}
          height={1}
        />
      ))}
      {images.map((image) => (
        <img
          key={image}
          src={`/img/profile/${image}.avif`}
          alt="preload"
          style={{ display: "none" }}
          width={1}
          height={1}
        />
      ))}
      {images.map((image) => (
        <img
          key={image}
          src={`/img/symbol/${image}.avif`}
          alt="preload"
          style={{ display: "none" }}
          width={1}
          height={1}
        />
      ))}
      {images.map((image) => (
        <img
          key={image}
          src={`/img/tail/${image}_tail.avif`}
          alt="preload"
          style={{ display: "none" }}
          width={1}
          height={1}
        />
      ))}
      <img
        src="/img/symbol/default.avif"
        alt="preload"
        style={{ display: "none" }}
        width={1}
        height={1}
      />
    </div>
  );
}

export default PreloadImages;
