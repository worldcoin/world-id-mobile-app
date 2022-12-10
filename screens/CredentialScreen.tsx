import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { append, deleteCredential } from "../store/credentialsSlice";
import Button from "../components/Button";
import { h1Style, textDefault, textSecondary } from "../styles";
import { CREDENTIALS_LABELS } from "../const";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createCredential } from "../logic/credentialLogic";
import {
  appendCredentialSecret,
  deleteCredentialSecret,
} from "../store/secureSlice";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    alignItems: "center",
  },
  title: {
    ...h1Style,
    color: textDefault,
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: "80%",
  },
  noCredentialContainer: {
    flex: 1,
    justifyContent: "center",
  },
  caption: {
    color: textSecondary,
  },
});

export default function CredentialScreen({
  route: {
    params: { credentialType },
  },
}: RootTabScreenProps<"Credential">) {
  const credentials = useAppSelector((state) => state.main.credentials.list);
  const credential = credentials.find((c) => c.type === credentialType);
  const dispatch = useAppDispatch();

  // FIXME: TMP to log
  const credentialSecrets = useAppSelector(
    (state) => state.secure.credentialSecrets
  );
  const credentialSecret = credentialSecrets.find(
    (c) => c.type === credentialType
  );

  const handleAddCredential = () => {
    const { credential, credentialSecret } = createCredential(credentialType);
    dispatch(append({ credential }));
    dispatch(appendCredentialSecret({ credentialSecret }));
  };

  const handleDeleteCredential = () => {
    dispatch(deleteCredential({ credentialType }));
    dispatch(deleteCredentialSecret({ credentialType }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{CREDENTIALS_LABELS[credentialType]}</Text>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {credential ? (
        <View>
          <Text style={styles.caption}>{JSON.stringify(credential)}</Text>
          <Text style={styles.caption}>
            Secret: {JSON.stringify(credentialSecret)}
          </Text>
          <Button label="Delete credential" onPress={handleDeleteCredential} />
        </View>
      ) : (
        <View style={styles.noCredentialContainer}>
          <View style={{ flexGrow: 1 }}>
            <Text style={styles.caption}>
              You don't have this credential yet.
            </Text>
          </View>
          <View style={{ paddingBottom: 32 }}>
            <Button label="Add Credential" onPress={handleAddCredential} />
          </View>
        </View>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
