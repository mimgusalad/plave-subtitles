import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import SubtitleSettingController from "../components/SubtitleSettingController";
import SubtitleFontSizeController from "../components/controllers/SubtitleFontSizeController";

function MobileNavBar({ selectedLanguage }) {
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return (
    <>
      {isPortrait ? (
        <>
          <SubtitleFontSizeController selectedLanguage={selectedLanguage} />
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
