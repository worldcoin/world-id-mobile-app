import { TextStyle } from "react-native";

// Font sizes
export const fontLg = 18;
export const fontMd = 16;
export const fontSm = 14;

// Borders
export const borderRadius = 12;

// Elevation
// https://ethercreative.github.io/react-native-shadow-generator/
export const elevation5 = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

export const h1Style: TextStyle = {
  fontSize: 30,
  fontWeight: "bold",
  paddingLeft: 16,
  paddingRight: 16,
};

export const h3Style: TextStyle = {
  fontWeight: "bold",
  fontSize: fontMd,
};
