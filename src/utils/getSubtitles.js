import axios from "axios";

export async function getSubtitles(videoId, subtitleCode) {
  try {
    const response = await axios.get(
      `https://mimgusalad.github.io/plave/subtitle/${videoId}/${subtitleCode}.json`
    );
    const subtitles = response.data;
    const subtitleHashTable = {};
    for (let i = 0; i < subtitles.length; i++) {
      const subtitle = subtitles[i];
      const startTimeInSeconds = subtitle.startTime;
      subtitleHashTable[startTimeInSeconds] = subtitle;
    }
    return subtitleHashTable;
  } catch (e) {
    console.error(e);
    return {};
  }
}
