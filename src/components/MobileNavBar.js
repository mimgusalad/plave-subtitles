import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FontSizeController from "./FontSizeController";
import SubtitlePositionController from "./SubtitlePositionController";

function MobileNavBar({ selectedLanguage }) {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  useEffect(() => {
    if (window.innerWidth < window.innerHeight && window.innerWidth < 500) {
      setIsMobilePortrait(true);
    }
  }, []);

  return (
    <div className="mobile-nav-bar">
      {isMobilePortrait ? (
        <>
          <FontSizeController selectedLanguage={selectedLanguage} />
          <SubtitlePositionController
            selectedLanguage={selectedLanguage}
            isMobilePortrait={isMobilePortrait}
          />
          <Home className="portrait-home-link" />
        </>
      ) : (
        <>
          <Home className="home-link" />
          <FontSizeController selectedLanguage={selectedLanguage} />
        </>
      )}
      {isMobilePortrait ? null : (
        <SubtitlePositionController
          selectedLanguage={selectedLanguage}
          isMobilePortrait={isMobilePortrait}
        />
      )}
    </div>
  );
}

function Home(classname) {
  return (
    <Link
      className={classname}
      to="/"
      style={{
        fontSize: "1.3em",
        textDecoration: "none",
        color: "rgb(207, 201, 201)",
        fontWeight: "bold",
      }}
    >
      {"HOME"}
    </Link>
  );
}

export default MobileNavBar;
