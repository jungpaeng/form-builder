import { RendererPlugin } from '@form-builder/renderer';
import React from 'react';

type WidgetExtensionType<Extension extends Record<string, unknown> = {}> = Extension & { widgetKey: string };
export type WidgetValueData<WidgetExtension extends WidgetExtensionType = { widgetKey: string }> = {
  element: React.ElementType;
  widgetOptions?: WidgetExtension;
};
type WidgetStoreData = {
  [storeName: string]: WidgetValueData;
};

type WidgetOutput<WidgetStore extends WidgetStoreData> = WidgetStore extends Record<
  string,
  WidgetValueData<infer WidgetExtension>
>
  ? WidgetExtension
  : never;

export function defineWidgetPlugin<Data extends WidgetStoreData>(
  widgetStore: Data
): RendererPlugin<{}, WidgetOutput<Data>> {
  return () => {
    return {
      key: 'define-widget',
      wrapField({ field, render }) {
        const widgetValue = field.widgetKey && widgetStore[field.widgetKey];
        if (!widgetValue) {
          return <React.Fragment>{render()}</React.Fragment>;
        }

        const { element: WidgetElement, widgetOptions } = widgetValue;
        return <WidgetElement {...widgetOptions} />;
      },
    };
  };
}
