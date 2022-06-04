import * as React from 'react';
import { useState } from 'react';

export interface GlobalSettingSProviderProps {
  children: React.ReactNode,
};

export interface GlobalSettingSType {};

export interface ValueType {
  globalSettings: GlobalSettingSType,
  updateGlobalSettings: updateGlobalSettingsType,
};

export type updateGlobalSettingsType = (varname: string, value: number | string) => void;

export const GlobalSettingSContext = React.createContext<ValueType>({} as ValueType);

export function GlobalSettingSProvider(props: GlobalSettingSProviderProps) {
  const {
    children,
  } = props;

  const [globalSettings, setGlobalSettings] = useState<GlobalSettingSType>({});

  const updateGlobalSettings: updateGlobalSettingsType = (varname, value) => {
    setGlobalSettings({...globalSettings, [varname]: value});
  }

  const value: ValueType = {
    globalSettings,
    updateGlobalSettings,
  };

  return (
    <GlobalSettingSContext.Provider value={value}>
      {children}
    </GlobalSettingSContext.Provider>
  );
}