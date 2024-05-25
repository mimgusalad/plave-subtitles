import { useState } from "react";
import FontSizeController from "./FontSizeController";
import LanguageSelector from "./LanguageSelector2";

function SettingsButton() {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(!open);
    console.log(open);
  };

  return (
    <>
      <button onClick={handleButtonClick}>Settings</button>
      {open && (
        <div style={{ backgroundColor: "gray" }}>
          <FontSizeController />
          <LanguageSelector />
        </div>
      )}
    </>
  );
}

export default SettingsButton;
