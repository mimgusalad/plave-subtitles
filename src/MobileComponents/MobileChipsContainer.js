import { Chip, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileChips from "./MobileChips";

function MobileChipsContainer({
  selectedLanguage,
  videoData,
  onFilterChange,
  originalData,
}) {
  const names = ["yejun", "noah", "bamby", "eunho", "hamin"];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const olders = names.slice(0, 2);
  const youngers = names.slice(2, 5);
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  const handleSelectedOptions = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((item) => item !== option);
      } else {
        return [
          ...prevSelectedOptions.filter((item) => item !== "all videos"),
          option,
        ];
      }
    });
  };

  const handleShowAllVideos = () => {
    setSelectedOptions([]);
  };

  const filteredVideos = () => {
    if (!videoData) return [];
    return videoData.filter((video) => {
      if (selectedOptions.length === 0) {
        return []; // Show all videos if no options are selected
      } else {
        // Check if any actor from selected options is in the video's actors array
        return selectedOptions.every((actor) =>
          video.actors.includes(actor.toLowerCase())
        );
      }
    });
  };

  useEffect(() => {
    onFilterChange(filteredVideos);
    if (selectedOptions.length === 0) {
      onFilterChange(originalData);
    }
  }, [selectedOptions]);

  return (
    <div
      className={`mobile-filter-chips-container${
        isPortrait ? "-portrait" : "-landscape"
      }`}
    >
      <div
        className={`mobile-filter-chips${
          isPortrait ? "-portrait" : "-landscape"
        }`}
      >
        {isPortrait ? (
          <>
            <div className="first-row">
              {olders.map((option, index) => (
                <MobileChips
                  key={index}
                  index={index}
                  selectedLanguage={selectedLanguage}
                  selected={selectedOptions.includes(names[index])}
                  handleSelectedOptions={handleSelectedOptions}
                />
              ))}
            </div>
            <div className="second-row">
              {youngers.map((option, index) => (
                <MobileChips
                  key={index}
                  index={index + 2}
                  selectedLanguage={selectedLanguage}
                  selected={selectedOptions.includes(names[index + 2])}
                  handleSelectedOptions={handleSelectedOptions}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {names.map((option, index) => (
              <MobileChips
                key={index}
                index={index}
                selectedLanguage={selectedLanguage}
                selected={selectedOptions.includes(names[index])}
                handleSelectedOptions={handleSelectedOptions}
              />
            ))}
          </>
        )}
      </div>
      <StyledChip
        clickable
        label={text[selectedLanguage]}
        onClick={handleShowAllVideos}
      />
    </div>
  );
}

export default MobileChipsContainer;

const text = {
  en: "SHOW ALL VIDEOS",
  ko: "전체 동영상",
  ja: "全ての動画",
};

const StyledChip = styled(Chip)(() => ({
  backgroundColor: "white",
  opacity: 0.7,
  fontWeight: "bold",
  "@media (max-height: 700px)": {
    fontSize: "12px",
  },
  "@media (min-height: 701px) and (max-height: 783px)": {
    fontSize: "14px",
  },
}));
