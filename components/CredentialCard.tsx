import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { grayDark1, textSecondary, white } from "../constants/Colors";
import { borderRadius, elevation5 } from "../constants/Styles";

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    borderRadius: borderRadius,
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
    marginBottom: 16,
    ...elevation5,
  },
  disabledCard: {
    opacity: 0.5,
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
  centered: {
    alignItems: "center",
    justifyContent: "center",
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
  return (
    <Pressable
      style={[styles.card, disabled ? styles.disabledCard : null]}
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
      <View style={{ flexGrow: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{name}</Text>
        <Text style={{ color: textSecondary }}>{caption}</Text>
      </View>
      <View style={styles.centered}>
        <View style={styles.moreDetailsButton}>
          <FontAwesome5 size={12} name="chevron-right" color={textSecondary} />
        </View>
      </View>
    </Pressable>
  );
}
