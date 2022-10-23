import React from 'react';

import { usePluginContext } from '../../plugins';
import { defineWidget } from '../../render/utils';

export function EffectManager() {
  const plugins = usePluginContext();

  React.useEffect(() => {
    function onInit() {
      plugins.forEach((plugin) => {
        plugin.onInit?.({ actions: { defineWidget } });
      });
    }

    onInit();
  }, [plugins]);

  return null;
}
