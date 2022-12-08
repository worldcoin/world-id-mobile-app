import { StyleSheet, View, Text } from "react-native";
import { white } from "../styles";

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 500,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "center",
  },
});

export default function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tagContainer}>
      <Text style={{ color: white }}>{label}</Text>
    </View>
  );
}
