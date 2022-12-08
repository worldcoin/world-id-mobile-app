import { StyleSheet } from "react-native";
import Button from "../components/Button";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps, ZKPRequest } from "../types";
import { useWebViewMessage } from "react-native-react-bridge";
import WebView from "react-native-webview";
import webApp from "../lib/semaphore-zkp/WebEntryZKP";

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
  const { ref, onMessage, emit } = useWebViewMessage<ZKPRequest>((message) => {
    console.log(message);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your World ID</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        label="Generate ZKP"
        onPress={() =>
          emit({
            type: "zkp_request",
            data: { merkle_root: "0x123", action_id: "wid_123" },
          })
        }
      />
      <WebView
        // ref, source and onMessage must be passed to react-native-webview
        ref={ref}
        // Pass the source code of React app
        source={{ html: webApp }}
        onMessage={onMessage}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error: ", nativeEvent);
        }}
      />
    </View>
  );
}
