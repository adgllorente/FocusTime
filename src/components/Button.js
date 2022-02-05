import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors } from "../utils/colors";
import { spacing } from "../utils/sizes";

export const ButtonTypes = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

export function Button({ text, type = ButtonTypes.PRIMARY, style, ...props }) {
  return (
    <TouchableOpacity style={[styles(type).button, style]} {...props}>
      <Text style={styles(type).text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = (type) =>
  StyleSheet.create({
    button: {
      borderRadius: 5,
      padding: spacing.md,
      backgroundColor:
        type === ButtonTypes.PRIMARY ? colors.white : colors.darkCoral,
    },
    text: {
      textAlign: "center",
      textTransform: "uppercase",
      fontWeight: "bold",
      color: type === ButtonTypes.PRIMARY ? colors.coral : colors.white,
    },
  });
