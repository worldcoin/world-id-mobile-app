import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { fontMd, gradientEnd, white } from "../styles";
import { LinearGradientText } from "./LinearGradientText";

export default function GradientButton({
  label,
  image,
  onPress,
}: {
  label: string;
  image?: ReactNode;
  onPress?: () => void;
}) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : {},
        ]}
        onPress={() => onPress?.()}
      >
        {image && <View style={styles.buttonIcon}>{image}</View>}
        <LinearGradientText
          colors={["#FF6848", "#EA374E"]}
          text={label}
          textStyle={{
            fontSize: fontMd,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 54,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: gradientEnd,
    borderWidth: 2,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonHeroGradient: {
    backgroundColor: white,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: fontMd,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
