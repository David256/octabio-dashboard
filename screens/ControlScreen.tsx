import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Separator from '../components/Separator';
import { RootStackParamList } from '../types';
import { Switch } from '../components/Switch';
import { MotorSetter } from '../components/MotorSetter';
import { useEffect, useState } from 'react';
import useAPI from '../hooks/useAPI';

export interface ControlScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>,
};

export default function ControlScreen(props: ControlScreenProps) {
  const { navigation } = props;
  const {sendApiValue} = useAPI();

  const [motor1, setMotor1] = useState(false);
  const [motor2, setMotor2] = useState(false);

  useEffect(() => {
    sendApiValue('motor1', motor1);
  }, [motor1]);

  useEffect(() => {
    sendApiValue('motor2', motor2);
  }, [motor2]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control</Text>
      <Separator />

      <Text>Motor 1:</Text>
      <Switch left='off' right='on' value={motor1} setValue={setMotor1} />

      <Separator />

      <Text>Motor 2:</Text>
      <Switch left='off' right='on' value={motor2} setValue={setMotor2} />

      {/* <View style={styles.motorsetters}>
        <MotorSetter name='motor 1' value={motor1} setValue={setMotor1} />
        <MotorSetter name='motor 2' value={motor2} setValue={setMotor2} />
      </View> */}
  
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
