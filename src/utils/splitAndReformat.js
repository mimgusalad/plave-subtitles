function splitAndReformat(line) {
  // Use regular expression to match the speaker and dialog
  const match = line.match(/^\[(.+?)\]\s*(.+)$/);
  if (match) {
    const speaker = match[1];
    const dialog = match[2];
    // Check if the speaker contains a slash
    if (speaker.indexOf("/") !== -1) return dialog;
    return { speaker, dialog };
  }
  return line;
}

export default splitAndReformat;
