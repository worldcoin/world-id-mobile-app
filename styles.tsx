import { TextStyle } from "react-native";

// Colors
export const grayDark6 = "#191C20";
export const white = "#FFFFFF";
export const textDefault = "#000";
export const textSecondary = "#858494";

// Font sizes
export const fontLg = 18;
export const fontMd = 16;
export const fontSm = 14;

// Borders
export const borderRadius = 12;

// Elevation
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
  color: white,
  paddingLeft: 16,
  paddingRight: 16,
};

export const h3Style: TextStyle = {
  fontWeight: "bold",
  fontSize: fontMd,
};
