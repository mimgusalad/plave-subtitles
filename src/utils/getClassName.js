import { isMobile, isTablet } from "react-device-detect";
const getClassName = () => {
  let classNames = "card";
  if (isMobile && !isTablet) {
    return (classNames = "mobile-" + classNames);
  }
  return (classNames = "desktop-" + classNames);
};

export default getClassName;
