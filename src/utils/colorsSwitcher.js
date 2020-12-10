const colorSwitcher = (value) => {
  switch (value) {
    case "Category":
      return "transparent";
    case "Main Expenses":
      return "#ECB22A";
    case "Food":
      return "#E28B20";
    case "Car":
      return "#D25925";
    case "Self Care":
      return "#67B7D0";
    case "Child Care":
      return "#5593D7";
    case "House":
      return "#3E6BA8";
    case "Education":
      return "#9CC254";
    case "Entertainment":
      return "#73AD57";
    case "Health":
      return "#507C3A";
    default:
      return;
  }
};

export default colorSwitcher;
