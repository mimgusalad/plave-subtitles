import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { hearts, names } from "../locale";
import nameConverter from "../utils/nameConverter";

function CustomChip({
  selectedLanguage,
  index,
  selected,
  selectedColor,
  handleSelectedOptions,
}) {
  const profileImage = `${process.env.PUBLIC_URL}/img/profile/${nameConverter(
    names[selectedLanguage][index]
  )}.png`;

  const handleChipClick = () => {
    handleSelectedOptions(names.en[index].toLowerCase());
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
    <div className="custom-chip" style={labelContainerStyle}>
      <Tooltip
        title={hearts[index]}
        placement="top"
        arrow
        sx={{
          color: "white",
          backgroundColor: "white",
        }}
      >
        <IconButton
          onClick={handleChipClick}
          color={selected ? "primary" : "default"}
          style={chipStyle}
        >
          <ResponsiveAvatar alt={names.en[index]} src={profileImage} />
        </IconButton>
      </Tooltip>
      <ResponsiveTypography selected={selected}>
        {names[selectedLanguage][index]}
      </ResponsiveTypography>
    </div>
  );
}

export default CustomChip;

const ResponsiveAvatar = styled(Avatar)(({ theme }) => ({
  width: "5em",
  height: "5em",
  "@media (max-width: 500px)": {
    width: "4em",
    height: "4em",
  },
  "@media (max-height: 700px)": {
    width: "3em",
    height: "3em",
  },
  "@media (min-height: 701px) and (max-height: 783px)": {
    width: "4em",
    height: "4em",
  },
  pointerEvents: "none",
}));

const ResponsiveTypography = styled(Typography)(({ theme, selected }) => ({
  fontSize: "1.2em",
  fontWeight: "bold",
  margin: "5px 10px 0px 10px",
  color: "white",
  opacity: selected ? 1 : 0.5,
  "@media (max-width: 500px)": {
    fontSize: "1em",
  },
  "@media (max-height: 700px)": {
    fontSize: "12px",
  },
  "@media (min-height: 701px) and (max-height: 783px)": {
    fontSize: "1em",
  },
}));
