import React from 'react';

import { FormBuilderRendererPlugin, PluginContext } from './plugins/PluginContext';

export type FormBuilderRendererOptions = {
  plugins?: Array<FormBuilderRendererPlugin | FormBuilderRendererPlugin[]>;
};

export function renderer(options: FormBuilderRendererOptions) {
  const plugins = (options.plugins ?? [])
    .reduce((prev: FormBuilderRendererPlugin[], curr) => {
      if (Array.isArray(curr)) return [...prev, ...curr];
      return [...prev, curr];
    }, [])
    .map((plugin) => plugin());

  return {
    Renderer() {
      return (
        <PluginContext.Provider value={plugins}>
          <p>Renderer Component</p>
        </PluginContext.Provider>
      );
    },
  };
}
