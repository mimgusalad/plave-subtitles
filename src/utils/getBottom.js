function getBottom() {
  let element = document.getElementsByClassName("youtube-player")[0];
  let elementBottom = element.getBoundingClientRect().bottom;
  let absoluteBottom = elementBottom + window.scrollY;
  return absoluteBottom;
}

export default getBottom;
