import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import { CredentialCard } from "../components/CredentialCard";
import GradientButton from "../components/GradientButton";
import Tag from "../components/Tag";
import { Text, View } from "../components/Themed";
import { getDockCheckUrl } from "../logic/doc-check";
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
import { Credentials, RootTabScreenProps } from "../types";
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
  // TODO: Move to more maintainable logic location
  const handleKYCCardPress = async () => {
    // const url = await getDockCheckUrl("0x123");
    // Linking.openURL(url);
    navigation.push("Credential", {
      credentialType: Credentials.Identity,
    });
  };

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
            onPress={() => {}}
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
            <CredentialCard
              name="Phone number"
              caption="Add your phone number"
              icon="phone-square"
            />
            <CredentialCard
              name="Identity"
              caption="Prove your age, country and more"
              icon="id-card"
              onPress={handleKYCCardPress}
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
