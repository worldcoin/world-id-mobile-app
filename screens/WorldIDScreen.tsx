import { ImageBackground, ScrollView, StyleSheet, Image } from "react-native";
import { CredentialCard } from "../components/CredentialCard";
import GradientButton from "../components/GradientButton";
import Tag from "../components/Tag";
import { Text, View } from "../components/Themed";
import {
  borderRadius,
  fontLg,
  fontMd,
  grayDark6,
  h1Style,
  h3Style,
  textDefault,
  textSecondary,
  white,
} from "../styles";
import { RootTabScreenProps } from "../types";
import { NativeModules } from "react-native";
import React from "react";
import Button from "../components/Button";

const { Semaphore } = NativeModules;
const constellation = require("../assets/images/constellation.png");
const profilePicPolygon = require("../assets/images/profile-pic-polygon.png");
const scanQRIcon = require("../assets/images/scan-qr-icon.png");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heroContainer: {
    paddingTop: 84,
    width: "100%",
    paddingBottom: 48,
  },
  titleLine: {
    flex: 1,
    flexDirection: "row",
  },
  profilePictureWrapper: {
    backgroundColor: "transparent",
    alignItems: "center",
    paddingTop: 32,
  },
  profilePictureContainer: {
    height: 104,
    width: 104,
  },
  profilePictureTextView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  profilePicture: {
    fontSize: 40,
  },
  title: {
    ...h1Style,
    paddingLeft: 32,
  },
  textId: {
    paddingTop: 4,
    fontSize: fontLg,
    fontWeight: "bold",
    textAlign: "center",
    color: white,
  },
  levelTagContainer: {
    backgroundColor: "transparent",
    paddingTop: 8,
  },
  mainContainer: {
    backgroundColor: white,
    flex: 1,
    width: "100%",
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    paddingTop: 32,
  },
});

export default function WorldIDScreen({
  navigation,
}: RootTabScreenProps<"WorldID">) {
  return (
    <View style={styles.container} lightColor={grayDark6} darkColor={grayDark6}>
      <ImageBackground
        source={constellation}
        style={styles.heroContainer}
        resizeMode="cover"
      >
        <Text style={styles.title}>Your World ID</Text>
        <View style={styles.profilePictureWrapper}>
          <ImageBackground
            source={profilePicPolygon}
            style={styles.profilePictureContainer}
            resizeMode="contain"
          >
            <View style={styles.profilePictureTextView}>
              <Text style={styles.profilePicture}>👻</Text>
            </View>
          </ImageBackground>
        </View>
        <Text style={styles.textId}>#ALC2031</Text>
        <View style={styles.levelTagContainer}>
          <Tag label="LEVEL 1" />
        </View>
      </ImageBackground>
      <View style={styles.mainContainer}>
        <View style={{ paddingHorizontal: 32 }}>
          <GradientButton
            label="Scan QR code"
            onPress={() => { }}
            image={
              <Image
                source={scanQRIcon}
                style={{ height: fontLg, width: fontLg }}
              />
            }
          />
        </View>
        <Text
          style={{
            ...h3Style,
            color: textDefault,
            paddingTop: 32,
            paddingHorizontal: 32,
          }}
        >
          Credentials
        </Text>
        <ScrollView style={{ paddingTop: 16, marginTop: 8 }}>
          <View style={{ paddingHorizontal: 32, paddingBottom: 32 }}>
            <Button label="Generate ZKP" onPress={() => {
              let seed = "secret111";
              let idcomm = Semaphore.generateIdentityCommitment(seed);
              console.log(idcomm);

              // TODO: replace with response from sequencer
              let merkle_proof = "[{\"Right\":\"0x291f395b4741727b369dfcb607a5609ee7ea691132e7320061baafd2e4c15e3a\"},{\"Right\":\"0x13d4b1396499bc6258759adc0f369d67dfe8c386d3cf9a0e25a64691d7b12b2e\"},{\"Right\":\"0x141fe68247b66f0c1fea201e13fd5d17ff7fab3ab5bbcc916ec1a9eed4842611\"},{\"Left\":\"0x18f43331537ee2af2e3d758d50f72106467c6eea50371dd528d57eb2b856d238\"},{\"Left\":\"0x07f9d837cb17b0d36320ffe93ba52345f1b728571a568265caac97559dbc952a\"},{\"Right\":\"0x0317d74689323d58fa4edcc42ddb7e4df9c4d3f05da3066435091eb8089b67f4\"},{\"Right\":\"0x1dec11b65cacfc1bc7f6a29fde843211fd13ec059beaeebf7ee9af58b24c4bb2\"},{\"Left\":\"0x078295e5a22b84e982cf601eb639597b8b0515a88cb5ac7fa8a4aabe3c87349d\"},{\"Left\":\"0x2fa5e5f18f6027a6501bec864564472a616b2e274a41211a444cbe3a99f3cc61\"},{\"Left\":\"0x0e884376d0d8fd21ecb780389e941f66e45e7acce3e228ab3e2156a614fcd747\"},{\"Left\":\"0x1b7201da72494f1e28717ad1a52eb469f95892f957713533de6175e5da190af2\"},{\"Right\":\"0x1a277d6cf8593ef8e6bb6bc8f022abf60a507966a7d47dd7fb9639602fdc380f\"},{\"Left\":\"0x2c5d82f66c914bafb9701589ba8cfcfb6162b0a12acf88a8d0879a0471b5f85a\"},{\"Left\":\"0x14c54148a0940bb820957f5adf3fa1134ef5c4aaa113f4646458f270e0bfbfd0\"},{\"Left\":\"0x190d33b12f986f961e10c0ee44d8b9af11be25588cad89d416118e4bf4ebe80c\"},{\"Left\":\"0x22f98aa9ce704152ac17354914ad73ed1167ae6596af510aa5b3649325e06c92\"},{\"Left\":\"0x2a7c7c9b6ce5880b9f6f228d72bf6a575a526f29c66ecceef8b753d38bba7323\"},{\"Left\":\"0x2e8186e558698ec1c67af9c14d463ffc470043c9c2988b954d75dd643f36b992\"},{\"Left\":\"0x0f57c5571e9a4eab49e2c8cf050dae948aef6ead647392273546249d1c1ff10f\"},{\"Left\":\"0x1830ee67b5fb554ad5f63d4388800e1cfe78e310697d46e43c9ce36134f72cca\"}]";

              let extNullifier = Semaphore.hashBytesToField("0xdeadbeef");
              let signal = Semaphore.hashBytesToField("0xdeadbeef");

              Semaphore.generateProofPacked(seed, extNullifier, signal, merkle_proof, (proof: String) => {
                var startTime = performance.now()
                console.log(proof);
                var endTime = performance.now()
                console.log(`Proof generation took ${endTime - startTime} milliseconds`)
              });
            }} />
            <CredentialCard
              name="Phone number"
              caption="Add your phone number"
              icon="phone-square"
            />
            <CredentialCard
              name="Identity"
              caption="Prove your age, country and more"
              icon="id-card"
            />
            <CredentialCard
              name="Orb by Worldcoin"
              caption="Coming soon"
              icon="user-check"
              disabled
            />
            <CredentialCard
              name="Device"
              caption="Coming soon"
              icon="mobile-alt"
              disabled
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
