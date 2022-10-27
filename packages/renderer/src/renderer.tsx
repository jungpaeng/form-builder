import React from 'react';

import { EffectManager } from './effects';
import { PluginContext, RendererPlugin } from './plugins';
import { defineWidget } from './render';
import { FormRender, FormRenderProps } from './render/components';
import { BeforeRenderAction, TupleToIntersection, UnionToIntersection } from './types';

type MetaValueValidator<T> = T extends RendererPlugin<infer M, Record<string, unknown>> ? M : never;
type FieldValueValidator<T> = T extends RendererPlugin<Record<string, unknown>, infer F> ? F : never;

type RendererOutput<T extends Array<RendererPlugin | RendererPlugin[]>> = {
  Renderer: React.FC<
    FormRenderProps<
      T extends Array<Array<infer _T>>
        ? UnionToIntersection<MetaValueValidator<_T>>
        : TupleToIntersection<{
            [I in keyof T]: MetaValueValidator<T[I]>;
          }>,
      T extends Array<Array<infer _T>>
        ? UnionToIntersection<FieldValueValidator<_T>>
        : TupleToIntersection<{
            [I in keyof T]: FieldValueValidator<T[I]>;
          }>
    >
  >;
};

export function renderer<T extends Array<RendererPlugin | RendererPlugin[]>>(options?: {
  plugins?: [...T];
  beforeRender?: BeforeRenderAction[];
}): RendererOutput<T> {
  const plugins =
    options?.plugins
      ?.reduce((prev: RendererPlugin[], curr) => {
        if (Array.isArray(curr)) return [...prev, ...curr];
        return [...prev, curr];
      }, [])
      .map((plugin) => plugin()) ?? [];

  options?.beforeRender
    ?.reduce((prev: BeforeRenderAction[], curr) => {
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
