import React from 'react';

import { createWidgetMapStore, CreateWidgetMapStoreOutput, WidgetMapStoreContext } from './context';
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

type DefineWidgetOption<WidgetOption extends Record<string, unknown> = {}> = (options: {
  defineWidget: CreateWidgetMapStoreOutput<WidgetOption>['setWidget'];
}) => void;

export function renderer<
  DefineWidgets extends DefineWidgetOption<Record<string, unknown>>[],
  PluginOption extends Array<RendererPlugin | RendererPlugin[]>
>(options?: { plugins?: [...PluginOption]; defineWidgets?: [...DefineWidgets] }): RendererOutput<PluginOption> {
  const widgetMapStore = createWidgetMapStore<
    TupleToIntersection<{
      [Key in keyof DefineWidgets]: DefineWidgets[Key] extends DefineWidgetOption<infer Value> ? Value : never;
    }>
  >();

  const plugins =
    options?.plugins
      ?.reduce((prev: RendererPlugin[], curr) => {
        if (Array.isArray(curr)) return [...prev, ...curr];
        return [...prev, curr];
      }, [])
      .map((plugin) => plugin()) ?? [];

  options?.defineWidgets?.forEach((item) => {
    item?.({ defineWidget: widgetMapStore.setWidget });
  });

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
