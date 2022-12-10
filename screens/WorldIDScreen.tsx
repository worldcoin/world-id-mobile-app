import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { CredentialCard } from "../components/CredentialCard";
import GradientButton from "../components/GradientButton";
import Tag from "../components/Tag";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { borderRadius, fontLg, h1Style, h3Style } from "../constants/Styles";
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
    color: Colors.dark.text, // Background is always dark here
    paddingLeft: 32,
  },
  levelTagContainer: {
    backgroundColor: "transparent",
    paddingTop: 8,
  },
  mainContainer: {
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
  // TODO: Move to more maintainable logic
  const handleKYCCardPress = async () => {
    navigation.push("Credential", {
      credentialType: Credentials.Identity,
    });
  };

  return (
    <View style={styles.container} lightColor="#000" darkColor="#000">
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
            paddingTop: 32,
            paddingHorizontal: 32,
          }}
        >
          Credentials
        </Text>
        <ScrollView style={{ paddingTop: 16, marginTop: 8 }}>
          <View style={{ paddingHorizontal: 32, paddingBottom: 32 }}>
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
              name="Phone number"
              caption="Coming soon"
              icon="phone-square"
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
      {/* Use a light status bar on iOS to account for the black background here */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
