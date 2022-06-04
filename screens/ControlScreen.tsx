import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Separator from '../components/Separator';
import { RootStackParamList } from '../types';

export interface ControlScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>,
};

export default function ControlScreen(props: ControlScreenProps) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control</Text>
      <Separator />
  
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
});
