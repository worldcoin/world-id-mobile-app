import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Pressable } from "react-native";
import { grayDark1, textSecondary } from "../constants/Colors";
import { borderRadius, elevation5 } from "../constants/Styles";
import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: borderRadius,
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
    marginBottom: 16,
    ...elevation5,
  },
  cardDarkMode: {
    backgroundColor: Colors.dark.background,
    borderWidth: 1,
    borderColor: textSecondary,
  },
  disabledCard: {
    opacity: 0.5,
  },
  disabledCardDarkMode: {
    backgroundColor: "#414345",
  },
  moreDetailsButton: {
    backgroundColor: grayDark1,
    height: 24,
    width: 24,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  moreDetailsButtonDarkMode: {
    backgroundColor: "#414345",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});

interface ICredentialCardProps {
  name: string;
  caption: string;
  icon: string;
  disabled?: boolean;
  onPress?: () => void;
}

export function CredentialCard({
  name,
  caption,
  icon,
  disabled,
  onPress,
}: ICredentialCardProps) {
  const theme = useColorScheme();
  return (
    <Pressable
      style={[
        styles.card,
        disabled && styles.disabledCard,
        theme === "dark" && styles.cardDarkMode,
        theme === "dark" && disabled && styles.disabledCardDarkMode,
      ]}
      onPress={() => !disabled && onPress?.()}
    >
      <View style={styles.centered}>
        <FontAwesome5
          size={20}
          style={{ marginRight: 8 }}
          name={icon}
          color={textSecondary}
        />
      </View>
      <View style={{ flexGrow: 1, backgroundColor: "transparent" }}>
        <Text style={{ fontWeight: "bold" }}>{name}</Text>
        <Text style={{ color: textSecondary }}>{caption}</Text>
      </View>
      <View style={styles.centered}>
        <View
          style={[
            styles.moreDetailsButton,
            theme === "dark" && styles.moreDetailsButtonDarkMode,
          ]}
        >
          <FontAwesome5 size={12} name="chevron-right" color={textSecondary} />
        </View>
      </View>
    </Pressable>
  );
}
