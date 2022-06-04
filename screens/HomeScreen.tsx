import { StyleSheet } from 'react-native';

import { FloatingAction, IActionProps } from 'react-native-floating-action';

import { View } from '../components/Themed';

import { colorPrimary } from '../constants/Colors';

import SensorStats from '../components/SensorStats';

import useAPI from '../hooks/useAPI';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useEffect, useState } from 'react';

const actions: IActionProps[] = [
  {
    name: 'control',
    text: 'Control',
    icon: <FontAwesome name='gamepad' style={{ marginBottom: 4 }} size={24} color={'#fff'}/>
  },
  {
    name: 'settings',
    text: 'Settings',
    icon: <FontAwesome name='gears' style={{ marginBottom: 4 }} size={24} color={'#fff'}/>
  },
];

export interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>,
};

export default function HomeScreen(props: HomeScreenProps) {
  const { navigation } = props;

  const api = useAPI();

  const [distance, setDistance] = useState(api.getApiValue('distance'));
  const [co, setCo] = useState(api.getApiValue('co'));
  const [power, setPower] = useState(api.getApiValue('power'));
  const [light, setLight] = useState(api.getApiValue('light'));
  const [humidity, setHumidity] = useState(api.getApiValue('humdity'));

  const updateValues = () => {
    setDistance(api.getApiValue('distance'));
    setCo(api.getApiValue('co'));
    setPower(api.getApiValue('power'));
    setLight(api.getApiValue('light'));
    setHumidity(api.getApiValue('humidity'));
  };


  useEffect(() => {
    setInterval(() => {
      updateValues();      
    }, 1000);
  }, []);

  const onFloatingPressItem = (name?: string | undefined) => {
    if (name === 'control') {
      navigation.navigate('Control')
    } else if (name === 'settings') {
      navigation.navigate('Settings')
    }
  };

  return (
    <View style={styles.container}>
      <SensorStats title="Monóxido de carbono:" percentage={Number.parseFloat(co as string)}/>
      <SensorStats title="Humedad:" percentage={Number.parseFloat(humidity as string)}/>
      <SensorStats title="Intensidad luminosa::" percentage={Number.parseFloat(light as string)}/>
      <SensorStats title="Potenciometro::" percentage={Number.parseFloat(power as string)}/>
      <SensorStats title="Distancia:" percentage={Number.parseFloat(distance as string)}/>

      <FloatingAction
        actions={actions}
        color={colorPrimary}
        onPressItem={onFloatingPressItem}
        floatingIcon={<FontAwesome name='bars' style={{ marginBottom: 4 }} size={24} color={'#fff'}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
