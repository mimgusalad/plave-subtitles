import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { text } from "../../locale";
import CustomChip from "./CustomChip";

function ChipsContainer({
  selectedLanguage,
  videoData,
  onFilterChange,
  originalData,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const memberColors = ["#33ccff", "#9933ff", "#ff3366", "#cc3300", "#4fd1a6"]; // 칩 클릭했을때 색깔
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

  // const filteredVideos = () => {
  //   if (!videoData) return [];
  //   return videoData.filter((video) => {
  //     console.log("video.Memebrs:" + video.Members);
  //     const actors = video.Members.split(",").map((actor) => actor.trim());
  //     console.log(actors);
  //     if (selectedOptions.length === 0) {
  //       return [];
  //     } else {
  //       return selectedOptions.every((selectedOption) =>
  //         actors.includes(selectedOption)
  //       );
  //     }
  //   });
  // };

  const filteredVideos = () => {
    if (!videoData) return [];
    return videoData.filter((video) => {
      if (selectedOptions.length === 0) {
        return [];
      } else {
        const actors = video.Members.split(",").map((actor) => actor.trim());
        return selectedOptions.every((actor) =>
          actors.includes(actor.toLowerCase())
        );
      }
    });
  };

  useEffect(() => {
    if (selectedOptions.length === 0) {
      onFilterChange(originalData);
    } else {
      onFilterChange(filteredVideos());
    }
  }, [selectedOptions]);

  const getClassName = () => {
    if (isTablet) return "-tablet";
    if (isMobile) return "-mobile";
    return "";
  };

  return (
    <div className={`filter-chips-container`}>
      <div className={`filter-chips${getClassName()}`}>
        {names.map((option, index) => (
          <CustomChip
            key={index}
            index={index}
            selectedLanguage={selectedLanguage}
            selected={selectedOptions.includes(names[index])}
            selectedColor={memberColors[index]}
            handleSelectedOptions={handleSelectedOptions}
          />
        ))}
      </div>
      <StyledChip
        clickable
        label={text[selectedLanguage]}
        onClick={handleShowAllVideos}
        isMobile={isMobile && !isTablet}
      />
    </div>
  );
}

export default ChipsContainer;

const StyledChip = styled(Chip)(({ isMobile }) => ({
  backgroundColor: "white",
  opacity: 0.7,
  fontWeight: "bold",
  height: "2em",
  fontSize: isMobile ? "12px" : "14px",
}));
