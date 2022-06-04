import * as React from 'react';

export interface LightControlProviderProps {
  children: React.ReactNode,
};

export interface ValueType {

};

export const LightControlContext = React.createContext<ValueType>({});

export function LightControlProvider(props: LightControlProviderProps) {
  const value: ValueType = {};

  return (
    <LightControlContext.Provider value={value}>
      {props.children}
    </LightControlContext.Provider>
  );
}
