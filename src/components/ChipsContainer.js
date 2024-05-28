import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import CustomChip from "./CustomChip";
import MobileChips from "./MobileChips";

const StyledChip = styled(Chip)(({ theme, selectedLanguage, lang }) => ({
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

function ChipsContainer({
  selectedLanguage,
  videoData,
  onFilterChange,
  originalData,
}) {
  const memberColors = ["#33ccff", "#9933ff", "#ff3366", "#cc3300", "#4fd1a6"];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const text = {
    en: "SHOW ALL VIDEOS",
    ko: "전체 동영상",
    ja: "全ての動画",
  };
  const names = ["yejun", "noah", "bamby", "eunho", "hamin"];
  const olders = names.slice(0, 2);
  const youngers = names.slice(2, 5);

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

  useEffect(() => {
    if (window.innerWidth > 500 && window.innerHeight > 900) {
      setIsMobile(true);
    }
  }, []);

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
    <div className="filter-chips-container">
      <div className="filter-chips">
        {isMobile ? (
          names.map((option, index) => (
            <CustomChip
              key={index}
              index={index}
              selectedLanguage={selectedLanguage}
              selected={selectedOptions.includes(names[index])}
              selectedColor={memberColors[index]}
              handleSelectedOptions={handleSelectedOptions}
            />
          ))
        ) : (
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

export default ChipsContainer;
