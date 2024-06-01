import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { hearts, memberColors, names } from "./../locale";

function MobileChips({
  selectedLanguage,
  index,
  selected,
  handleSelectedOptions,
}) {
  const handleChipClick = () => {
    handleSelectedOptions(names.en[index].toLowerCase());
  };

  return (
    <div className="custom-chip">
      <StyledChip
        selected={selected}
        selectedColor={memberColors[index]}
        onClick={handleChipClick}
        label={`${hearts[index]} ${names[selectedLanguage][index]}`}
      />
    </div>
  );
}

const StyledChip = styled(Chip)(({ selected, selectedColor }) => ({
  backgroundColor: selected ? selectedColor : "#000000",
  opacity: selected ? 1 : 0.5,
  color: "white",
  fontSize: "1em",
  padding: "3px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: selectedColor,
    opacity: 1, // Ensure full opacity on hover
  },
}));

export default MobileChips;
