import { StyleSheet } from 'react-native';

import { RootTabScreenProps } from '../types';
import {View} from 'react-native';

export default function TerminalScreen({ navigation }: RootTabScreenProps<'Terminal'>) {
  return (
    <View style={[styles.container, {
      flexDirection:"column"
      }]}
    >    
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
