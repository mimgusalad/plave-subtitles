function secondsToHms(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor(d % 60);

  const hDisplay = h > 0 ? h + ":" : "";
  const mDisplay = m > 0 ? m + ":" : "00:";
  const sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "00";
  return hDisplay + mDisplay + sDisplay;
}

export default secondsToHms;
