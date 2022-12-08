import { View, Text, StyleSheet } from "react-native";
import { borderRadius, elevation5, white } from "../styles";

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    borderRadius: borderRadius,
    paddingVertical: 16,
    paddingHorizontal: 16,
    // Shadow
    ...elevation5,
  },
});

export function CredentialCard() {
  return (
    <View style={styles.card}>
      <View></View>
      <View>
        <Text>DE Passport</Text>
      </View>
    </View>
  );
}
