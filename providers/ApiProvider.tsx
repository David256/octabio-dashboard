import * as React from 'react';
import { useEffect, useState } from 'react';
import useSimulation, { useKaoticSimulation, useSmartSimulation } from '../hooks/useSimulation';

const smartSimulation = useSmartSimulation();
const kaoticSimulation = useKaoticSimulation();

const enableVariables = [
  'distance',
  'co',
  'power',
  'light',
  'humidity',
  'pulse',
  'log',
]

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

export type SendApiValueType = (varname: string, value: string) => void;

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
    update();
  }, []);

  const getApiValue: GetApiValueType = (varname) => {
    return sensorData[varname] || 0;
  }

  const sendApiValue: SendApiValueType = (varname, value) => {
    // TODO: send this value using Bluetooth
    console.log(`sending ${varname} = "${value}"`);
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
