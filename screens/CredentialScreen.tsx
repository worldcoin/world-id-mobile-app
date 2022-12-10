import { StatusBar } from "expo-status-bar";
import { Linking, Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { CredentialStatus, RootTabScreenProps } from "../types";
import {
  append,
  deleteCredential,
  updateCredentialRemoteState,
} from "../store/credentialsSlice";
import Button from "../components/Button";
import {
  danger,
  fontLg,
  fontMd,
  h1Style,
  success,
  textDefault,
  textSecondary,
} from "../styles";
import { CREDENTIALS_LABELS } from "../const";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createCredential, registerCredential } from "../logic/credentialLogic";
import {
  appendCredentialSecret,
  deleteCredentialSecret,
} from "../store/secureSlice";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import Tag from "../components/Tag";
import { FontAwesome5 } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    alignItems: "center",
  },
  title: {
    ...h1Style,
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
  credentialId: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: fontMd,
  },
  verificationIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  verificationIndicatorText: {
    fontWeight: "bold",
    fontSize: fontLg,
    paddingLeft: 4,
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

  useEffect(() => {
    if (credential?.identityCommitment) {
      dispatch(
        updateCredentialRemoteState({
          type: credentialType,
          identityCommitment: credential?.identityCommitment,
        })
      );
    }
  }, []);

  // FIXME: TMP to log
  const credentialSecrets = useAppSelector(
    (state) => state.secure.credentialSecrets
  );
  const credentialSecret = credentialSecrets.find(
    (c) => c.type === credentialType
  );

  const handleAddCredential = async () => {
    const { credential, credentialSecret } = createCredential(credentialType);

    dispatch(append({ credential }));
    dispatch(appendCredentialSecret({ credentialSecret }));

    // TODO: Move to more maintainable logic
    const url = await registerCredential(
      credential.identityCommitment,
      credentialType
    );
    if (url) {
      Linking.openURL(url);
    }
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
          <View style={{ flexGrow: 1 }}>
            <Text style={styles.credentialId}>
              {credential.identityCommitment
                .substring(
                  credential.identityCommitment.length - 10,
                  credential.identityCommitment.length
                )
                .toLocaleUpperCase()}
            </Text>

            {credential.status === CredentialStatus.Verified ? (
              <View style={styles.verificationIndicator}>
                <FontAwesome5 size={18} name="check-circle" color={success} />
                <Text
                  style={{
                    color: success,
                    ...styles.verificationIndicatorText,
                  }}
                >
                  Verified
                </Text>
              </View>
            ) : (
              <View style={styles.verificationIndicator}>
                <FontAwesome5 size={18} name="times-circle" color={danger} />
                <Text
                  style={{
                    color: danger,
                    ...styles.verificationIndicatorText,
                  }}
                >
                  Nov Verified
                </Text>
              </View>
            )}
          </View>
          <View style={{ paddingBottom: 128 }}>
            <Button
              label="Delete credential"
              onPress={handleDeleteCredential}
            />
          </View>
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

      {/* https://github.com/calintamas/react-native-toast-message/blob/main/docs/modal-usage.md */}
      <Toast position="bottom" />
    </View>
  );
}
