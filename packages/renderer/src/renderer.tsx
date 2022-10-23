import React from 'react';

import { EffectManager } from './effects';
import { FormBuilderRendererPlugin, PluginContext } from './plugins';
import { FormRenderer } from './render/components';
import { defineWidget } from './render/utils';

export type BeforeRenderAction = (args: {
  actions: {
    defineWidget: typeof defineWidget;
  };
}) => void;

export type FormBuilderRendererOptions = {
  beforeRender?: Array<BeforeRenderAction | BeforeRenderAction[]>;
  plugins?: Array<FormBuilderRendererPlugin | FormBuilderRendererPlugin[]>;
};

export function renderer(options: FormBuilderRendererOptions) {
  const plugins = (options.plugins ?? [])
    .reduce((prev: FormBuilderRendererPlugin[], curr) => {
      if (Array.isArray(curr)) return [...prev, ...curr];
      return [...prev, curr];
    }, [])
    .map((plugin) => plugin());

  (options.beforeRender ?? [])
    .reduce((prev: BeforeRenderAction[], curr) => {
      if (Array.isArray(curr)) return [...prev, ...curr];
      return [...prev, curr];
    }, [])
    .forEach((item) => item?.({ actions: { defineWidget } }));

  return {
    Renderer() {
      return (
        <PluginContext.Provider value={plugins}>
          <FormRenderer />
          <EffectManager />
        </PluginContext.Provider>
      );
    },
  };
}
