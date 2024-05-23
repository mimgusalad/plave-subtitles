import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

function CustomChip({ name, selected, selectedColor, handleSelectedOptions }) {
  const handleChipClick = () => {
    handleSelectedOptions(name);
  };

  const avatarStyle = {
    width: "40px", // Increase the width of the avatar
    height: "40px", // Increase the height of the avatar
  };

  if (name === "all videos") {
    return (
      <Chip
        label={name}
        onClick={handleChipClick}
        color={selected ? "primary" : "default"}
        style={{
          backgroundColor: selected ? selectedColor : "#eeeeee",
          color: selected ? "#ffffff" : "#333333",
          fontSize: "1.2em",
        }}
      />
    );
  }

  return (
    <Chip
      avatar={<Avatar alt={name} src={`/img/${name}.png`} />}
      label={name}
      onClick={handleChipClick}
      color={selected ? "primary" : "default"}
      style={{
        backgroundColor: selected ? selectedColor : "#eeeeee",
        color: selected ? "#ffffff" : "#333333",
        fontSize: "1.2em",
        fontWeight: "bold",
        boxShadow: "0",
      }}
    />
  );
}

export default CustomChip;
