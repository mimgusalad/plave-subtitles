import { useState } from "react";
import { tooltipText1, tooltipText2 } from "../locale";
function GuideTooltip({ lang, handleGuideClose }) {
  const [tooltip1, setTooltip1] = useState(true);
  const [tooltip2, setTooltip2] = useState(false);

  const handleTooltip1 = () => {
    setTooltip1(false);
    setTooltip2(true);
  };

  const handleTooltip2 = () => {
    setTooltip1(false);
    setTooltip2(false);
    handleGuideClose();
  };

  return (
    <div className="guide-tooltip">
      {tooltip1 && (
        <div id="tooltip1">
          <img alt="tooltip" src="/img/tooltip.avif" />
          <span>{tooltipText1[lang]}</span>
          <button className="tooltip-button" onClick={handleTooltip1}>
            OK
          </button>
        </div>
      )}
      {tooltip2 && (
        <div id="tooltip2">
          <img alt="tooltip" src="/img/tooltip.avif" />
          <span>{tooltipText2[lang]}</span>
          <button className="tooltip-button" onClick={handleTooltip2}>
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default GuideTooltip;
