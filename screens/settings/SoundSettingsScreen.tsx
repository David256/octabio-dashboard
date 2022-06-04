import * as React from 'react';
import { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import Separator from '../../components/Separator';

import Checkbox from '../../components/Checkbok';
import useGlobalSettings from '../../hooks/useGlobalSettings';

export default function SoundSettingsScreen() {
  const {globalSettings, updateGlobalSettings} = useGlobalSettings();

  const [onDistance, setOnDistance] = useState(globalSettings.onDistance || false);
  const [onMoving, setOnMoving] = useState(globalSettings.onMoving || false);
  const [onCO, setOnCO] = useState(globalSettings.onCO || false);
  const [onPower, setOnPower] = useState(globalSettings.onPower || false);
  const [onLight, setOnLight] = useState(globalSettings.onLight || false);

  const createHandler = (varname: string) => (isChecked: boolean) => {
    updateGlobalSettings(varname, isChecked);
  };

  useEffect(() => {
    setOnDistance(globalSettings.onDistance || false);
  }, [globalSettings.onDistance]);

  useEffect(() => {
    setOnMoving(globalSettings.onMoving || false);
  }, [globalSettings.onMoving]);

  useEffect(() => {
    setOnCO(globalSettings.onCO || false);
  }, [globalSettings.onCO]);

  useEffect(() => {
    setOnPower(globalSettings.onPower || false);
  }, [globalSettings.onPower]);

  useEffect(() => {
    setOnLight(globalSettings.onLight || false);
  }, [globalSettings.onLight]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reproduce un sonido cuando el sensor reciba datos</Text>
      <Separator />

      <Checkbox
        value={onDistance}
        onCheck={createHandler('onDistance')}
      >Sensor de distancia cercana</Checkbox>

      <Checkbox
        value={onMoving}
        onCheck={createHandler('onMoving')}
      >Sensor de movimiento</Checkbox>

      <Checkbox
        value={onCO}
        onCheck={createHandler('onCO')}
      >Sensor de CO</Checkbox>

      <Checkbox
        value={onPower}
        onCheck={createHandler('onPower')}
      >Sensor potenciómetro</Checkbox>

      <Checkbox
        value={onLight}
        onCheck={createHandler('onLight')}
      >Sensor de iluminación</Checkbox>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
});
