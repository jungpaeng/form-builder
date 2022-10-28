import React from 'react';

import { createWidgetMapStore, CreateWidgetMapStoreOutput, WidgetMapStoreContext } from './context';
import { EffectManager } from './effects';
import { PluginContext, RendererPlugin } from './plugins';
import { FormRender, FormRenderProps } from './render/components';
import { TupleToIntersection, UnionToIntersection } from './types';

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

type DefineWidgetOption = (options: { defineWidget: CreateWidgetMapStoreOutput['setWidget'] }) => void;

export function renderer<T extends Array<RendererPlugin | RendererPlugin[]>>(options?: {
  plugins?: [...T];
  defineWidgets?: Array<DefineWidgetOption | DefineWidgetOption[]>;
}): RendererOutput<T> {
  const widgetMapStore = createWidgetMapStore();
  const plugins =
    options?.plugins
      ?.reduce((prev: RendererPlugin[], curr) => {
        if (Array.isArray(curr)) return [...prev, ...curr];
        return [...prev, curr];
      }, [])
      .map((plugin) => plugin()) ?? [];

  options?.defineWidgets
    ?.reduce((prev: DefineWidgetOption[], curr) => {
      if (Array.isArray(curr)) return [...prev, ...curr];
      return [...prev, curr];
    }, [])
    .forEach((item) => item?.({ defineWidget: widgetMapStore.setWidget }));

  return {
    Renderer(formRenderProps) {
      return (
        <WidgetMapStoreContext.Provider value={widgetMapStore}>
          <PluginContext.Provider value={plugins}>
            <FormRender {...formRenderProps} />
            <EffectManager />
          </PluginContext.Provider>
        </WidgetMapStoreContext.Provider>
      );
    },
  };
}
