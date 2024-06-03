import { names } from "./../locale";
function nameConverter(name) {
  let index = names.en.indexOf(name);
  if (index === -1) {
    index = names.ko.indexOf(name);
  }
  if (index === -1) {
    index = names.ja.indexOf(name);
  }

  if (index !== -1) {
    return names.en[index].toLowerCase();
  } else {
    return name; // Or any default value you'd like to return if the name is not found
  }
}

export default nameConverter;
