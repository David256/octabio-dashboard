import * as React from 'react';
import { LightControlContext } from '../providers/LightControlProvider';

export function useLightControl() {
  const context = React.useContext(LightControlContext);

  if (!context) {
    throw new Error('useLightControl must be into a provider');
  }

  return context;
}