import { StyleSheet, View, Pressable, Text } from "react-native";
import { fontMd } from "../styles";

export default function Button({
  label,
  variant = "primary",
  onPress,
}: {
  label: string;
  variant?: "primary";
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
        <Text style={styles.buttonLabel}>{label}</Text>
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
    backgroundColor: "#4940E0",
  },
  buttonPressed: {
    backgroundColor: "#3B32C3",
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
