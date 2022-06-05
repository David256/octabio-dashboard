import * as React from 'react';
import { GlobalSettingSContext } from '../providers/GlobalSettingSProvider';

export default function useGlobalSettings() {
  const context = React.useContext(GlobalSettingSContext);

  if (!context) {
    throw new Error('useGlobalSettings must be into a GlobalSettingSProvider');
  }

  return context;
}
