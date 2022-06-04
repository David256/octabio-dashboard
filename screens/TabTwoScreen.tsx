import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import SensorStats from '../components/SensorStats';

export default function TabTwoScreen() {
  return (
    <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column"
    }]}>
      {/* <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
      <SensorStats title="Monóxido de carbono:" percentage={0.1}/>
      <SensorStats title="Humedad:" percentage={0.9}/>
      <SensorStats title="Intensidad luminosa::" percentage={0.9}/>
      <SensorStats title="Potenciometro::" percentage={0.9}/>
      <SensorStats title="Distancia:" percentage={0.9}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    /* alignItems: 'center',
    justifyContent: 'center', */
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
