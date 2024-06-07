const leftHandRotation = () => {
  resetHtml();
  const htmlElement = document.documentElement;
  htmlElement.style.transform = "rotate(-90deg)";
  htmlElement.style.transformOrigin = "left top";
  // htmlElement.style.width = "calc(var(--vh, 1vh) * 100)";
  htmlElement.style.width = "100dvh";
  htmlElement.style.height = "100dvw";
  htmlElement.style.overflowX = "hidden";
  htmlElement.style.position = "absolute";
  htmlElement.style.top = "100%";
  htmlElement.style.left = "0";
  // document.body.style.width = "calc(var(--vh, 1vh) * 100)";
  document.body.style.width = "100dvh";
  document.body.style.height = "100dvw";
  document.body.style.fontFamily =
    "Roboto, Yu Gothic UI, Pretendard-Regular, sans-serif";
};

const rightHandRotation = () => {
  resetHtml();
  const htmlElement = document.documentElement;
  htmlElement.style.transform = "rotate(90deg)"; // Rotate 90 degrees clockwise
  htmlElement.style.transformOrigin = "left bottom"; // Adjust the transform origin
  // htmlElement.style.width = "calc(var(--vh, 1vh) * 100)";
  htmlElement.style.width = "100dvh";
  htmlElement.style.height = "100dvw";
  htmlElement.style.overflowX = "hidden";
  htmlElement.style.position = "fixed";
  htmlElement.style.top = "-100dvw"; // Adjust position to align correctly
  // document.body.style.width = "calc(var(--vh, 1vh) * 100)";
  document.body.style.width = "100dvh";
  document.body.style.height = "100dvw";
  document.body.style.fontFamily =
    "Roboto, Yu Gothic UI, Pretendard-Regular, sans-serif";
};

const resetHtml = () => {
  const htmlElement = document.documentElement;
  htmlElement.style.transform = "";
  htmlElement.style.transformOrigin = "";
  htmlElement.style.width = "";
  htmlElement.style.height = "";
  htmlElement.style.overflowX = "";
  htmlElement.style.position = "";
  htmlElement.style.top = "";
  htmlElement.style.left = "";
  document.body.style.width = "100dvw";
  // document.body.style.height = "calc(var(--vh, 1vh) * 100)";
  document.body.style.height = "100dvh";
  document.body.style.fontFamily =
    "Roboto, Yu Gothic UI, Pretendard-Regular, sans-serif";
};

export { leftHandRotation, resetHtml, rightHandRotation };
