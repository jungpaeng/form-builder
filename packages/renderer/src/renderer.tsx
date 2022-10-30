import React from 'react';

import { EffectManager } from './effects';
import { PluginContext, RendererPlugin } from './plugins';
import { FormRender, FormRenderProps } from './render/components';
import { TupleToIntersection, UnionToIntersection } from './types';

type MetaValueValidator<PluginOption> = PluginOption extends RendererPlugin<infer Meta, never> ? Meta : never;
type FieldValueValidator<PluginOption> = PluginOption extends RendererPlugin<never, infer Field> ? Field : never;

type RendererOutput<PluginOption extends Array<RendererPlugin | RendererPlugin[]>> = {
  Renderer: React.FC<
    FormRenderProps<
      PluginOption extends Array<Array<infer Value>>
        ? UnionToIntersection<MetaValueValidator<Value>>
        : TupleToIntersection<{
            [Key in keyof PluginOption]: MetaValueValidator<PluginOption[Key]>;
          }>,
      PluginOption extends Array<Array<infer Value>>
        ? UnionToIntersection<FieldValueValidator<Value>>
        : TupleToIntersection<{
            [Key in keyof PluginOption]: FieldValueValidator<PluginOption[Key]>;
          }>
    >
  >;
};

export function renderer<PluginOption extends Array<RendererPlugin | RendererPlugin[]>>(options?: {
  plugins?: [...PluginOption];
}): RendererOutput<PluginOption> {
  const plugins =
    options?.plugins
      ?.reduce((prev: RendererPlugin[], curr) => {
        if (Array.isArray(curr)) return [...prev, ...curr];
        return [...prev, curr];
      }, [])
      .map((plugin) => plugin()) ?? [];

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
