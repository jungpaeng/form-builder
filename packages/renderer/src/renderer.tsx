import React from 'react';

import { EffectManager } from './effects';
import { RendererPlugin, PluginContext } from './plugins';
import { FormRender, FormRenderProps } from './render/components';
import { defineWidget } from './render/utils';
import { BeforeRenderAction } from './types';

export type RendererOptions<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
> = {
  beforeRender?: Array<BeforeRenderAction | BeforeRenderAction[]>;
  plugins?: Array<RendererPlugin<MetaExtension, FieldExtension> | RendererPlugin<MetaExtension, FieldExtension>[]>;
};

export type RendererOutput<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
> = {
  Renderer: React.FC<FormRenderProps<MetaExtension, FieldExtension>>;
};

export function renderer<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
>(options: RendererOptions<MetaExtension, FieldExtension>): RendererOutput<MetaExtension, FieldExtension> {
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
