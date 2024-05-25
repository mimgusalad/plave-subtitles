import React, { useEffect, useState } from "react";
import CustomChip from "./CustomChip";
import { Chip } from "@mui/material";

function ChipsContainer({
  selectedLanguage,
  videoData,
  onFilterChange,
  originalData,
}) {
  const memberColors = ["#33ccff", "#9933ff", "#ff3366", "#cc3300", "#33cc99"];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const text = {
    en: "SHOW ALL VIDEOS",
    ko: "전체 동영상",
    ja: "全ての動画",
  };
  const names = ["yejun", "noah", "bamby", "eunho", "hamin"];

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
    <div className="filter-chips-container">
      <div className="filter-chips">
        {names.map((option, index) => (
          <CustomChip
            index={index}
            selectedLanguage={selectedLanguage}
            selected={selectedOptions.includes(names[index])}
            selectedColor={memberColors[index]}
            handleSelectedOptions={handleSelectedOptions}
          />
        ))}
      </div>
      <Chip
        clickable
        label={text[selectedLanguage]}
        onClick={handleShowAllVideos}
        style={{
          backgroundColor: "white",
          opacity: 0.7,
          fontWeight: "bold",
        }}
      />
    </div>
  );
}

export default ChipsContainer;
