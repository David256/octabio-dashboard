import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';

import Checkbox from '../../components/Checkbok';

export default function SoundSettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reproduce un sonido cuando el sensor reciba datos</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Checkbox>Sensor de distancia cercana</Checkbox>
      <Checkbox>Sensor de movimiento</Checkbox>
      <Checkbox>Sensor de CO</Checkbox>
      <Checkbox>Sensor potenciómetro</Checkbox>
      <Checkbox>Sensor de iluminación</Checkbox>

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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
});
