import * as React from 'react';
import { useState } from 'react';

const testData = {
  distance: 0.2,
  co: 0.9,
  power: 0.1,
  light: 0.4,
  humidity: 0.7,
  pulse: 1,
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
    let value: number | string = 0
    if (Object.keys(testData).includes(varname)) {
      value = testData[varname as keyof typeof testData];
    } else {
      value = sensorData[varname] || 0;
    }
    return value || 0;
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
