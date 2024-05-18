// Function to find the subtitle for a given timestamp using the hash table
function findSubtitle(timestamp, subtitleHashTable) {
  const timestampInSeconds = Math.floor(timestamp); // Assuming the timestamp is in seconds
  const tolerance = 2; // Increased tolerance for a wider range of timestamps

  console.log(`Searching for timestamp: ${timestampInSeconds}`);

  for (
    let i = timestampInSeconds - tolerance;
    i <= timestampInSeconds + tolerance;
    i++
  ) {
    const subtitle = subtitleHashTable[i];
    if (subtitle) {
      const subtitleStartTime = subtitle.startTime;
      console.log(`Found subtitle at timestamp: ${subtitleStartTime}`);
      if (Math.abs(subtitleStartTime - timestamp) <= tolerance) {
        return subtitle.text;
      }
    }
  }

  console.log("No matching subtitle found");
  return null; // No subtitle found for the given timestamp
}

export default findSubtitle;
