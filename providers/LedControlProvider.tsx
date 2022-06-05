import * as React from 'react';
import { useState } from 'react';

export interface LedControlProviderProps {
  children: React.ReactNode,
};

export interface ValueType {
  updateLed: updateLedType,
  leds: LedsType,
};

export interface LedsType {
  [key: number]: LedStateType,
};

export type LedStateType = 'on' | 'off';

export interface updateLedType {
  (id: number, state: LedStateType): void
};

export const LedControlContext = React.createContext<ValueType>({} as ValueType);

export function LedControlProvider(props: LedControlProviderProps) {
  const [leds, setLeds] = useState<LedsType>({});

  const updateLed: updateLedType = (id, state) => {
    setLeds((last) => ({...last, [id]: state}));
    // TODO: send led status using Bluetooth.
  };

  const value: ValueType = {
    updateLed,
    leds,
  };

  return (
    <LedControlContext.Provider value={value}>
      {props.children}
    </LedControlContext.Provider>
  );
}
