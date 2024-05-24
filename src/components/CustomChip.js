import { IconButton, Avatar, Typography } from "@mui/material";

function CustomChip({ name, selected, selectedColor, handleSelectedOptions }) {
  const handleChipClick = () => {
    handleSelectedOptions(name);
  };

  const labelFontStyle = {
    fontSize: "1.2em",
    margin: "0 20px 0px 0",
    color: "white",
    opacity: selected ? 1 : 0.5,
  };

  const avatarStyle = {
    width: "100px", // Increase the width of the avatar
    height: "100px", // Increase the height of the avatar
  };

  const chipStyle = {
    margin: "0 20px 5px 0",
    backgroundColor: selected ? selectedColor : "",
    opacity: selected ? 1 : 0.7,
    color: selected ? "#ffffff" : "#333333",
    fontSize: "1.2em",
    padding: "3px", // 보더 굵기
  };

  const labelContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={labelContainerStyle}>
      <IconButton
        onClick={handleChipClick}
        color={selected ? "primary" : "default"}
        style={chipStyle}
      >
        <Avatar alt={name} src={`/img/${name}.png`} style={avatarStyle} />
      </IconButton>
      <Typography variant="caption" style={labelFontStyle}>
        {name}
      </Typography>
    </div>
  );
}

export default CustomChip;
