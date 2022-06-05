import React, { useEffect } from "react";
import { Text } from './Themed';
import * as Progress from 'react-native-progress';
import { View, StyleSheet, Vibration } from 'react-native';

export interface SensorStatsProps {
  title: string,
  percentage: number,
};

export default function SensorStats(props: SensorStatsProps) {
  const { title, percentage } = props;

  useEffect(() => {
    if (percentage > 0.8) {
      // Vibration.vibrate([3000, 2000, 2000]);
    } else {
      // Vibration.cancel();
    }
  }, [percentage]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Progress.Bar height={10} progress={percentage} width={null}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  text: {
    fontSize: 20
  },
});