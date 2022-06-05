import * as React from 'react';
import { LedControlContext } from '../providers/LedControlProvider';

/**
 * Create things to control a the leds
 * @returns An state and its setter.
 */
export default function useLedControl() {
  const context = React.useContext(LedControlContext);

  if (!context) {
    throw new Error('useLedControl must be into a provider');
  }

  return context;
}