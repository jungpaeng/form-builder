import React from 'react';

import { CreateWidgetMapStoreOutput } from './createWidgetMapStore';

export const WidgetMapStoreContext = React.createContext({} as CreateWidgetMapStoreOutput);

export function useWidgetMapStoreContext<WidgetOption extends Record<string, unknown> = {}>() {
  const context = React.useContext(WidgetMapStoreContext);

  if (!context) throw Error('[WidgetMapStoreContext] Not found provider component');
  return context as CreateWidgetMapStoreOutput<WidgetOption>;
}
