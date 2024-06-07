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
  )}.avif`;

  const handleChipClick = () => {
    handleSelectedOptions(names.en[index].toLowerCase());
  };

  const Chips = {
    // 데스크탑 화면
    desktop: (
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
          style={chipStyle({ selected, selectedColor })}
        >
          <ResponsiveAvatar
            size="4.3em" // 프로필 사진 크기
            alt={names.en[index]}
            src={profileImage}
          />
        </IconButton>
      </Tooltip>
    ),
    // 태블릿 화면
    tablet: (
      <IconButton
        onClick={handleChipClick}
        color={selected ? "primary" : "default"}
        style={chipStyle({ selected, selectedColor })}
      >
        <ResponsiveAvatar
          size="4em" // 프로필 사진 크기
          alt={names.en[index]}
          src={profileImage}
        />
      </IconButton>
    ),
    // 모바일 화면
    mobile: (
      <IconButton
        onClick={handleChipClick}
        color={selected ? "primary" : "default"}
        style={chipStyleMobile({ selected, selectedColor })}
      >
        <ResponsiveAvatar
          size="3em" // 프로필 사진 크기
          alt={names.en[index]}
          src={profileImage}
        />
      </IconButton>
    ),
  };

  return (
    <div className="custom-chip" style={labelContainerStyle}>
      {
        Chips[
          isTablet ? "tablet" : isMobile && !isTablet ? "mobile" : "desktop"
        ]
      }
      <ResponsiveTypography
        selected={selected}
        isMobile={isMobile && !isTablet}
      >
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

const ResponsiveTypography = styled(Typography)(({ selected, isMobile }) => ({
  fontSize: isMobile ? "12px" : "1em",
  fontWeight: "bold",
  marginTop: "5px",
  color: "rgba(0, 0, 0, 0.87)",
  opacity: selected ? 1 : 0.5,
}));

const chipStyle = ({ selected, selectedColor }) => ({
  margin: "0 10px 0px 10px",
  backgroundColor: selected ? selectedColor : "rgb(97, 97, 97, 0.1)",
  opacity: selected ? 1 : 0.7,
  color: selected ? "#ffffff" : "#333333",
  fontSize: "1.2em",
  padding: "3px",
});

const chipStyleMobile = ({ selected, selectedColor }) => ({
  margin: "0 0.2em",
  backgroundColor: selected ? selectedColor : "rgb(97, 97, 97, 0.1)",
  opacity: selected ? 1 : 0.7,
  color: selected ? "#ffffff" : "#333333",
  fontSize: "0.5em",
  padding: "3px",
});

const labelContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
