import { StyleSheet } from "react-native";
import Button from "../components/Button";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingTop: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default function WorldIDScreen({
  navigation,
}: RootTabScreenProps<"WorldID">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your World ID</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button label="Generate ZKP" onPress={() => console.log(1)} />
    </View>
  );
}
