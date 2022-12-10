import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet, View, Pressable } from "react-native";
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
      <Pressable onPress={() => onPress?.()}>
        {({ pressed }) => (
          <LinearGradient
            colors={[gradientStart, gradientEnd]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={[
              {
                borderRadius: 11,
              },
              pressed ? styles.buttonPressed : {},
            ]}
          >
            <View style={styles.button}>
              <View
                style={[
                  styles.buttonInternal,
                  pressed ? styles.buttonPressed : {},
                ]}
              >
                {image && <View style={styles.buttonIcon}>{image}</View>}
                <LinearGradientText
                  text={label}
                  textStyle={styles.buttonLabel}
                />
              </View>
            </View>
          </LinearGradient>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 54,
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
