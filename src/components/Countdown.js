import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes } from "../utils/sizes";

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export function Countdown({ minutes = 0.1, isPaused, onProgress, onEnd }) {
  const interval = useRef(null);
  const [millis, setMillis] = useState(null);
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }

      const timeLeft = time - 1000;

      // Report progress
      return timeLeft;
    });
  };

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));

    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
  },
});
