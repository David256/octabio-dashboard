import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import SensorStats from '../components/SensorStats';

import useAPI from '../hooks/useAPI';

export default function HomeScreen() {
  const api = useAPI();

  const distance = api.getApiValue('distance');
  const co = api.getApiValue('co');
  const power = api.getApiValue('power');
  const light = api.getApiValue('light');
  const humidity = api.getApiValue('humidity');

  return (
    <View style={styles.container}>
      <SensorStats title="Monóxido de carbono:" percentage={Number.parseFloat(co as string)}/>
      <SensorStats title="Humedad:" percentage={Number.parseFloat(humidity as string)}/>
      <SensorStats title="Intensidad luminosa::" percentage={Number.parseFloat(light as string)}/>
      <SensorStats title="Potenciometro::" percentage={Number.parseFloat(power as string)}/>
      <SensorStats title="Distancia:" percentage={Number.parseFloat(distance as string)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
