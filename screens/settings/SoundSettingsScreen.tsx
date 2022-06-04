import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import Separator from '../../components/Separator';

import Checkbox from '../../components/Checkbok';
import useGlobalSettings from '../../hooks/useGlobalSettings';

export default function SoundSettingsScreen() {
  const {globalSettings, updateGlobalSettings} = useGlobalSettings();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reproduce un sonido cuando el sensor reciba datos</Text>
      <Separator />

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
});
