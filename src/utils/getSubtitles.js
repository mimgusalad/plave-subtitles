import axios from "axios";

export async function getSubtitles(videoId, langCode) {
  try {
    const response = await axios.get(
      "https://api.plave-subtitles.com/file/subtitle",
      {
        params: { videoId, langCode },
      }
    );
    const subtitles = response.data;
    const subtitleHashTable = {};
    for (let i = 0; i < subtitles.length; i++) {
      const subtitle = subtitles[i];
      subtitleHashTable[subtitle.startTime] = subtitle;
    }
    return subtitleHashTable;
  } catch (e) {
    console.error(e);
    return {};
  }
}
