import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Separator from '../components/Separator';
import { RootStackParamList } from '../types';
import { Switch } from '../components/Switch';
import { MotorSetter } from '../components/MotorSetter';
import { useState } from 'react';

export interface ControlScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>,
};

export default function ControlScreen(props: ControlScreenProps) {
  const { navigation } = props;

  const [motor1, setMotor1] = useState(0);
  const [motor2, setMotor2] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control</Text>
      <Separator />

      <Switch left='manual' right='automático' />

      <View style={styles.motorsetters}>
        <MotorSetter name='motor 1' value={motor1} setValue={setMotor1} />
        <MotorSetter name='motor 2' value={motor2} setValue={setMotor2} />
      </View>
  
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  motorsetters: {
    marginTop: 10,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
