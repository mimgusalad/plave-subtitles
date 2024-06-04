import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { isMobile, isTablet } from "react-device-detect";
import { hearts, names } from "../../locale";
import nameConverter from "../../utils/nameConverter";

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

  const chipStyleMobile = {
    margin: "0 0.2em",
    backgroundColor: selected ? selectedColor : "",
    opacity: selected ? 1 : 0.7,
    color: selected ? "#ffffff" : "#333333",
    fontSize: "0.5em",
    padding: "3px", // 보더 굵기
  };

  const labelContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const Chips = {
    default: (
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
          <ResponsiveAvatar
            size="5em"
            alt={names.en[index]}
            src={profileImage}
          />
        </IconButton>
      </Tooltip>
    ),
    tablet: (
      <IconButton
        onClick={handleChipClick}
        color={selected ? "primary" : "default"}
        style={chipStyle}
      >
        <ResponsiveAvatar size="4em" alt={names.en[index]} src={profileImage} />
      </IconButton>
    ),
    mobile: (
      <IconButton
        onClick={handleChipClick}
        color={selected ? "primary" : "default"}
        style={chipStyleMobile}
      >
        <ResponsiveAvatar size="3em" alt={names.en[index]} src={profileImage} />
      </IconButton>
    ),
  };

  return (
    <div className="custom-chip" style={labelContainerStyle}>
      {Chips[isTablet ? "tablet" : isMobile ? "mobile" : "default"]}
      <ResponsiveTypography selected={selected}>
        {names[selectedLanguage][index]}
      </ResponsiveTypography>
    </div>
  );
}

export default CustomChip;

const ResponsiveAvatar = styled(Avatar)(({ size }) => ({
  width: size,
  height: size,
  pointerEvents: "none",
}));

const ResponsiveTypography = styled(Typography)(({ selected }) => ({
  fontSize: "1.2em",
  fontWeight: "bold",
  margin: "5px 10px 0px 10px",
  color: "white",
  opacity: selected ? 1 : 0.5,
}));
