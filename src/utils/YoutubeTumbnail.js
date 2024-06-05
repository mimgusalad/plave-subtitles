import imageCompression from "browser-image-compression";
import React, { useEffect, useState } from "react";

const YouTubeThumbnail = ({ videoId }) => {
  const [webpSrc, setWebpSrc] = useState("");

  useEffect(() => {
    const fetchAndConvertImage = async () => {
      const jpegUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      try {
        const response = await fetch(jpegUrl);
        const blob = await response.blob();

        const compressedBlob = await imageCompression(blob, {
          maxSizeMB: 1,
          useWebWorker: true,
          fileType: "image/webp",
        });

        const webpUrl = URL.createObjectURL(compressedBlob);
        setWebpSrc(webpUrl);
      } catch (error) {
        console.error("Error converting image:", error);
      }
    };

    fetchAndConvertImage();
  }, [videoId]);

  const jpegSrc = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img width={"100%"} src={jpegSrc} alt="YouTube Thumbnail" />
    </picture>
  );
};

export default YouTubeThumbnail;
