import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import FontSizeController from "../components/FontSizeController";
import SubtitleSettingController from "../components/SubtitleSettingController";

function MobileNavBar({ selectedLanguage }) {
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return (
    <>
      {isPortrait ? (
        <>
          <FontSizeController selectedLanguage={selectedLanguage} />
          <Home className="mobile-home-portrait" />
        </>
      ) : (
        <>
          <SubtitleSettingController lang={selectedLanguage} />
        </>
      )}
    </>
  );
}

function Home() {
  return (
    <Link
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
