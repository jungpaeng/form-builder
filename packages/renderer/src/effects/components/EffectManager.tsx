import React from 'react';

import { usePluginContext } from '../../plugins/PluginContext';

export function EffectManager() {
  const plugins = usePluginContext();

  React.useEffect(() => {
    function onInit() {
      plugins.forEach((plugin) => plugin.onInit?.());
    }

    onInit();
  }, [plugins]);

  return null;
}
