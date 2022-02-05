import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Vibration, Platform } from "react-native";
import LottieView from "lottie-react-native";

import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";
import { Countdown } from "../../components/Countdown";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";
import { Button, ButtonTypes } from "../../components/Button";

const DEFAULT_TIME = 0.1;

export function Timer({ focusSubject, onTimerEnd, clearSubject }) {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const animationRef = useRef();
  const [isModifying, setIsModifying] = useState(false);

  useEffect(() => {
    if (isStarted) {
      animationRef.current.resume();
    } else {
      animationRef.current.pause();
    }
  }, [isStarted]);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 3000);
    } else {
      Vibration.vibrate(3000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsModifying(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Task: <Text style={styles.task}>{focusSubject}</Text>
      </Text>
      <View style={styles.countdown}>
        {isModifying ? (
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => changeTime(10)}
              style={{ marginRight: spacing.md }}
              text="10:00"
            ></Button>
            <Button
              onPress={() => changeTime(20)}
              style={{ marginRight: spacing.md }}
              text="20:00"
            ></Button>
            <Button onPress={() => changeTime(30)} text="30:00"></Button>
          </View>
        ) : (
          <View onStartShouldSetResponder={() => setIsModifying(true)}>
            <Countdown
              minutes={minutes}
              onProgress={onProgress}
              isPaused={!isStarted}
              onEnd={onEnd}
            />
          </View>
        )}
      </View>
      <View style={styles.animation}>
        <LottieView
          ref={animationRef}
          style={{ flex: 1 }}
          source={require("../../assets/girl-animation.json")}
          loop
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          style={{ flex: 1, marginRight: spacing.md }}
          text={isStarted ? "Pause" : "Start"}
          onPress={() => setIsStarted(!isStarted)}
          type={ButtonTypes.PRIMARY}
        />
        <Button
          style={{ flex: 1 }}
          text="Cancel"
          type={ButtonTypes.SECONDARY}
          onPress={() => clearSubject()}
        />
      </View>
      <View style={styles.progressBar}>
        <ProgressBar
          progress={progress}
          color={colors.darkCoral}
          style={{ height: 10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    flex: 1,
    fontSize: spacing.lg,
    color: colors.black,
    textAlign: "center",
    paddingTop: spacing.xxl,
  },
  task: {
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
  },
  countdown: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    flex: 6,
  },
  buttonWrapper: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.md,
  },
  clearSubject: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 25,
    paddingLeft: 25,
  },
  progressBar: {
    flex: 0.5,
    justifyContent: "flex-end",
  },
});
