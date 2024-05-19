import { Link } from "react-router-dom";
import FontSizeController from "./FontSizeController";
import LanguageFab from "./LanguageFAB";

function Sidebar({ handleLanguageChange }) {
  return (
    <div className="sidebar">
      <li>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <h3>HOME</h3>
        </Link>
      </li>
      <li>
        <FontSizeController />
      </li>
      <li>
        <LanguageFab handleSubtitleLanguageChange={handleLanguageChange} />
      </li>
    </div>
  );
}

export default Sidebar;
