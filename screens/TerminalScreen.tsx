import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text} from '../components/Themed';
import { RootTabScreenProps } from '../types';
import SensorStats from '../components/SensorStats';
import {View} from 'react-native';

export default function TerminalScreen({ navigation }: RootTabScreenProps<'Terminal'>) {
  return (
    <View style={[styles.container, {
      flexDirection:"column"
      }]}>
      {/* <Text style={styles.title}>App Name</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TerminalScreen.tsx" /> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:2
    /* alignItems: 'center',
    justifyContent: 'center', */
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  /* separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }, */
});
