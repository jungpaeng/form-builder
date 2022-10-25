import React from 'react';

import { EffectManager } from './effects';
import { RendererPlugin, PluginContext } from './plugins';
import { FormRender, FormRenderProps } from './render/components';
import { defineWidget } from './render/utils';
import { BeforeRenderAction } from './types';

export type RendererOptions = {
  beforeRender?: Array<BeforeRenderAction | BeforeRenderAction[]>;
  plugins?: Array<RendererPlugin | RendererPlugin[]>;
};

export type RendererOutput = {
  Renderer: React.FC<FormRenderProps>;
};

export function renderer(options: RendererOptions): RendererOutput {
  const plugins = (options.plugins ?? [])
    .reduce((prev: RendererPlugin[], curr) => {
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
    Renderer(formRenderProps) {
      return (
        <PluginContext.Provider value={plugins}>
          <FormRender {...formRenderProps} />
          <EffectManager />
        </PluginContext.Provider>
      );
    },
  };
}
