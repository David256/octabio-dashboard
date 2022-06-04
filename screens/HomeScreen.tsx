import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import SensorStats from '../components/SensorStats';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
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
    padding: 5,
  },
});
