import { IconButton, Avatar, Typography, Tooltip } from "@mui/material";

function CustomChip({
  selectedLanguage,
  index,
  selected,
  selectedColor,
  handleSelectedOptions,
}) {
  index = Number(index);
  const names = {
    en: ["Yejun", "Noah", "Bamby", "Eunho", "Hamin"],
    ko: ["예준", "노아", "밤비", "은호", "하민"],
    ja: ["イェジュン", "ノア", "バンビ", "ウノ", "ハミン"],
  };

  const hearts = ["💙", "💜", "💗", "❤️", "🖤"];

  const handleChipClick = () => {
    handleSelectedOptions(names.en[index].toLowerCase());
  };

  const labelFontStyle = {
    fontSize: "1.2em",
    fontWeight: "bold",
    margin: "0 10px 0px 10px",
    color: "white",
    opacity: selected ? 1 : 0.5,
  };

  const avatarStyle = {
    // width: "100px", // Increase the width of the avatar
    // height: "100px", // Increase the height of the avatar
    width: "5em",
    height: "5em",
  };

  const chipStyle = {
    margin: "0 10px 0px 10px",
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
      <Tooltip
        title={hearts[index]}
        placement="top"
        arrow
        sx={{
          color: "white",
        }}
      >
        <IconButton
          onClick={handleChipClick}
          color={selected ? "primary" : "default"}
          style={chipStyle}
        >
          <Avatar
            alt={names.en[index]}
            src={`/img/${names.en[index]}.png`}
            style={avatarStyle}
          />
        </IconButton>
      </Tooltip>
      <Typography variant="caption" style={labelFontStyle}>
        {names[selectedLanguage][index]}
      </Typography>
    </div>
  );
}

export default CustomChip;
