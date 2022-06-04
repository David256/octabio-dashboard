import * as React from 'react';
import { useState } from 'react';

export type OnApiChangeCallbackType = (value: string) => void;

export type OnApiChangeType = (varname: string, callback: OnApiChangeCallbackType) => void;

export type SendApiValueType = (varname: string, value: string) => void;

export interface ApiProviderProps {
  children: React.ReactNode,
};

export interface ValueType {
  onApiChange: OnApiChangeType,
  sendApiValue: SendApiValueType,
};

export const ApiContext = React.createContext<ValueType>({} as ValueType);

export function ApiProvider(props: ApiProviderProps) {
  const onApiChange: OnApiChangeType = (varname, callback) => {
    if (varname === '') return;
    callback(varname); // TODO: edit that
  };

  const sendApiValue: SendApiValueType = (varname, value) => {
    // TODO: send this value
  }

  const value: ValueType = {
    onApiChange,
    sendApiValue,
  };

  return (
    <ApiContext.Provider value={value}>
      {props.children}
    </ApiContext.Provider>
  );
}
