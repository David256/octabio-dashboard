import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Button } from 'react-native';
import { Text, View } from '../components/Themed';
import Separator from '../components/Separator';
import { RootStackParamList } from '../types';
import { colorPrimary } from '../constants/Colors';

export interface SettingsScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>,
};

export default function SettingsScreen(props: SettingsScreenProps) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Separator />

      <Button
        onPress={() => {
          navigation.navigate('SoundSettings')
        }}
        color={colorPrimary}
        title="Sound Settings"
      />
  
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
