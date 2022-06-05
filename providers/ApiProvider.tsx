import * as React from 'react';
import { useEffect, useState } from 'react';
import endpoint from '../endpoint';
import useSimulation, { useKaoticSimulation, useSmartSimulation } from '../hooks/useSimulation';

const smartSimulation = useSmartSimulation();
const kaoticSimulation = useKaoticSimulation();

const enableVariables = [
  // 'distance',
  // 'co',
  // 'power',
  // 'light',
  // 'humidity',
  // 'pulse',
  'log',
];

const errorMessages = [
  'todo falló.',
  'alta temperatura',
  'niveles críticos de CO',
  'el dólar cerró a...',
  'humedad baja',
  'servomotor bloqueado',
  'escotilla abierta',
];

const getRandomErrorMessage = () => {
  const index = Math.floor(Math.random() * errorMessages.length);
  return errorMessages[index];
}

const testData = (lastData: SensorDataType) => {
  return {
    distance: kaoticSimulation((lastData.distance as number) || 0),
    co: smartSimulation((lastData.co as number) || 0),
    power: kaoticSimulation((lastData.power as number) || 0),
    light: kaoticSimulation((lastData.light as number) || 0),
    humidity: smartSimulation((lastData.humidity as number) || 0),
    pulse: Math.floor(Math.random()),

    log: 'input\n5434565',
  };
}

export interface SensorDataType {
  [key: string]: string | number;
};

export type GetApiValueType = (varname: string) => string | number;

export type SendApiValueType = (varname: string, value: string | boolean) => void;

export interface ApiProviderProps {
  children: React.ReactNode,
};

export interface ValueType {
  data: SensorDataType,
  getApiValue: GetApiValueType,
  sendApiValue: SendApiValueType,
};

export const ApiContext = React.createContext<ValueType>({} as ValueType);

export function ApiProvider(props: ApiProviderProps) {
  const [sensorData, setSensorData] = useState<SensorDataType>({});

  const update = () => {
    setSensorData(testData(sensorData));

    setTimeout(() => update(), 1000);
  }

  useEffect(() => {
    // update();
    // return;
    setInterval(async () => {
      try {
        const response = await fetch(`http://${endpoint.host}:${endpoint.port}${endpoint.path}`, { method: 'GET'});
        const json = await response.json();
        // console.log(json);

        (json as any[]).forEach((item) => {
          // console.log('name', item.nombre);
          if (item.nombre === 'pot') {
            const value = ((item.dato as number) / 1023);
            // console.log(value);
            if (value !== sensorData.power) {
              setSensorData({...sensorData, power: value});
              // console.log('updated');
            }
          } else if (item.nombre === 'fot') {
            const value = ((item.dato as number) / 1023);
            // console.log(value);
            if (value !== sensorData.light) {
              setSensorData({...sensorData, light: value});
              // console.log('updated');
            }
          }
        });
      } catch (err) {
        console.error(err);
      }
    }, 3000);
  }, []);

  const getApiValue: GetApiValueType = (varname) => {
    if (varname === 'log') {
      return `Error ${Math.floor(Math.random() * 10 + 20)}: ${getRandomErrorMessage()}`;
    }
    return sensorData[varname] || 0;
  }

  const sendApiValue: SendApiValueType = (varname, value) => {
    // TODO: send this value using Bluetooth
    console.log(`sending ${varname} = "${value}"`);
    // motor={1,2}, estado={on,off}
    let led = null;
    let motor = null;
    let estado = value;
    if (varname === 'motor1' || varname === 'motor2') {
      if (varname === 'motor1') {
        motor = '1';
      } else if (varname === 'motor2') {
        motor = '2';
      }
      console.log('motor', motor, estado);

      fetch(
        `http://${endpoint.host}:${endpoint.port}${endpoint.path}`,
        { method: 'POST',
        body: JSON.stringify([{tipo: 'motor', nombre: motor, estado: estado ? 'go' : 'off'}]) }
      );
    } else if (varname === 'led1' || varname === 'led2') {
      if (varname === 'led1') {
        led = '1';
      } else if (varname === 'led2') {
        led = '2';
      }
      console.log('led', led, estado);

      fetch(
        `http://${endpoint.host}:${endpoint.port}${endpoint.path}`,
        { method: 'POST', body: JSON.stringify([{tipo: 'led', nombre: led, estado}]) }
      );
    } else if (varname === 'text') {
      fetch(
        `http://${endpoint.host}:${endpoint.port}${endpoint.path}`,
        { method: 'POST', body: JSON.stringify([{tipo: '""', nombre: '', estado: value}]) }
      );
    }
  }

  const value: ValueType = {
    getApiValue,
    sendApiValue,
    data: sensorData,
  };

  return (
    <ApiContext.Provider value={value}>
      {props.children}
    </ApiContext.Provider>
  );
}
