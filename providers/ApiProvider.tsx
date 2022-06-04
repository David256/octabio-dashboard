import * as React from 'react';
import { useEffect, useState } from 'react';

const enableVariables = [
  'distance',
  'co',
  'power',
  'light',
  'humidity',
  'pulse',
  'log',
]

const testData = () => {
  return {
    distance: Math.random(),
    co: Math.random(),
    power: Math.random(),
    light: Math.random(),
    humidity: Math.random(),
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
    setSensorData(testData());

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
