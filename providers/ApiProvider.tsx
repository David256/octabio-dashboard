import * as React from 'react';
import { useState } from 'react';

const enableVariables = [
  'distance',
  'co',
  'power',
  'light',
  'humidity',
  'pulse',
]

const testData = () => {
  return {
    distance: Math.random(),
    co: Math.random(),
    power: Math.random(),
    light: Math.random(),
    humidity: Math.random(),
    pulse: Math.floor(Math.random()),
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
  getApiValue: GetApiValueType,
  sendApiValue: SendApiValueType,
};

export const ApiContext = React.createContext<ValueType>({} as ValueType);

export function ApiProvider(props: ApiProviderProps) {
  const [sensorData, setSensorData] = useState<SensorDataType>({});

  const getApiValue: GetApiValueType = (varname) => {
    if (enableVariables.includes(varname)) {
      const data = testData();
      return data[varname as keyof typeof data];
    }
    return sensorData[varname] || 0;
  }

  const sendApiValue: SendApiValueType = (varname, value) => {
    // TODO: send this value
    console.log(`sending ${varname} = "${value}"`);
  }

  const value: ValueType = {
    getApiValue,
    sendApiValue,
  };

  return (
    <ApiContext.Provider value={value}>
      {props.children}
    </ApiContext.Provider>
  );
}
