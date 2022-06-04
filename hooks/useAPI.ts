import * as React from 'react';
import { ApiContext } from '../providers/ApiProvider';

export default function useAPI() {
  const context = React.useContext(ApiContext);

  if (!context) {
    throw new Error('useAPI must be into a ApiProvider');
  }

  return context;
}
