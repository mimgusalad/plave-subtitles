import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

function MobileChips({
  selectedLanguage,
  index,
  selected,
  handleSelectedOptions,
}) {
  const names = {
    en: ["Yejun", "Noah", "Bamby", "Eunho", "Hamin"],
    ko: ["예준", "노아", "밤비", "은호", "하민"],
    ja: ["イェジュン", "ノア", "バンビ", "ウノ", "ハミン"],
  };
  const memberColors = ["#5daded", "#aa8ed6", "#f0b1c4", "#dd2e44", "#33cc99"];
  const hearts = ["💙", "💜", "💗", "❤️", "🖤"];

  const handleChipClick = () => {
    handleSelectedOptions(names.en[index].toLowerCase());
  };

  console.log("selectedLanguage:", selectedLanguage);
  console.log("index:", index);
  console.log(names[selectedLanguage][index]);

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
