import { isMobile, isTablet } from "react-device-detect";
const getClassName = () => {
  let classNames = "card";
  if (isMobile && !isTablet) {
    classNames = "mobile-" + classNames;
  } else if (isTablet) {
    classNames = "tablet-" + classNames;
  } else {
    classNames = "desktop-" + classNames;
  }
  return classNames;
};

export default getClassName;
