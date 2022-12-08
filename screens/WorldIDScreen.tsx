import { ImageBackground, StyleSheet } from "react-native";
import Button from "../components/Button";
import Tag from "../components/Tag";
import { Text, View } from "../components/Themed";
import { fontLg, h1Style, white } from "../styles";
import { RootTabScreenProps } from "../types";
const constellation = require("../assets/images/constellation.png");
const profilePicPolygon = require("../assets/images/profile-pic-polygon.png");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heroContainer: {
    paddingTop: 84,
    width: "100%",
    paddingBottom: 16,
  },
  titleLine: {
    flex: 1,
    flexDirection: "row",
  },
  profilePictureWrapper: {
    backgroundColor: "transparent",
    alignItems: "center",
    paddingTop: 16,
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
  },
  textId: {
    paddingTop: 4,
    fontSize: fontLg,
    fontWeight: "bold",
    textAlign: "center",
  },
  levelContainer: {
    backgroundColor: "transparent",
    paddingTop: 8,
  },
});

export default function WorldIDScreen({
  navigation,
}: RootTabScreenProps<"WorldID">) {
  return (
    <View style={styles.container}>
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
        <View style={styles.levelContainer}>
          <Tag label="LEVEL 1" />
        </View>
      </ImageBackground>
    </View>
  );
}
