import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { fontMd, gradientEnd, gradientStart, white } from "../styles";
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
      <LinearGradient
        colors={[gradientStart, gradientEnd]}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={{
          borderRadius: 11,
        }}
      >
        <View style={styles.button}>
          <Pressable
            style={({ pressed }) => [
              styles.buttonInternal,
              pressed ? styles.buttonPressed : {},
            ]}
            onPress={() => onPress?.()}
          >
            {image && <View style={styles.buttonIcon}>{image}</View>}
            <LinearGradientText text={label} textStyle={styles.buttonLabel} />
          </Pressable>
        </View>
      </LinearGradient>
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
    margin: 1,
    flex: 1,
    backgroundColor: white,
  },
  buttonInternal: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: fontMd,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
