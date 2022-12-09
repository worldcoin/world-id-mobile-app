/**
 * Forked from https://github.com/HMDarkFir3/react-native-linear-gradient-text
 * MIT license. Copyright (c) 2022 Henrique Luis Oliveira Marques
 */
import React, { FC } from "react";
import { Text, TextStyle, StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { gradientEnd, gradientStart } from "../styles";

interface Props {
  text: string;
  textStyle?: TextStyle;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export const LinearGradientText: FC<Props> = (props) => {
  const {
    text,
    textStyle = {},
    start = { x: 0.3, y: 0 },
    end = { x: 1, y: 1 },
  } = props;

  const colors = [gradientStart, gradientEnd];

  return (
    <MaskedView
      maskElement={<Text style={[styles.maskText, textStyle]}>{text}</Text>}
    >
      <LinearGradient colors={colors} start={start} end={end}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  maskText: {
    backgroundColor: "transparent",
  },
  text: {
    opacity: 0,
  },
});
