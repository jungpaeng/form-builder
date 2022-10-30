import React from 'react';

import { usePluginContext } from '../../plugins';

export function EffectManager() {
  const plugins = usePluginContext();

  React.useEffect(() => {
    plugins.forEach((plugin) => plugin.onInit?.());
  }, [plugins]);

  return null;
}
