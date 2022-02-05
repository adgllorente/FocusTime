import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { fontSizes, spacing } from "../../utils/sizes";
import { colors } from "../../utils/colors";
import { Button, ButtonTypes } from "../../components/Button";
import { mantras } from "../../utils/mantras";

export function Focus({ addSubject }) {
  const [subject, setSubject] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your task?</Text>
      <Text style={styles.subtitle}>
        {mantras[Math.floor(Math.random() * 9) + 0]}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          style={styles.input}
          underlineColor="white"
          activeUnderlineColor="white"
          onSubmitEditing={({ nativeEvent }) => setSubject(nativeEvent.text)}
        />
        <Button
          style={styles.button}
          text="Focus"
          type={ButtonTypes.PRIMARY}
          onPress={() => {
            addSubject(subject);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.md,
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: fontSizes.xl,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.white,
    fontSize: fontSizes.lg,
    marginBottom: spacing.xxl,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: colors.coral,
    flex: 8,
    marginRight: spacing.md,
    height: 50,
    backgroundColor: colors.darkCoral,
  },
  button: {
    flex: 2,
    height: 50,
  },
});
