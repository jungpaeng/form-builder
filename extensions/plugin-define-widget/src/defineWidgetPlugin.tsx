import { RendererPlugin } from '@form-builder/renderer';
import React from 'react';

type WidgetStore<WidgetExtension extends Record<string, unknown> = {}> = {
  [key: string]: WidgetExtension & {
    element: React.ElementType;
  };
};

export function defineWidgetPlugin<WidgetStoreValue extends WidgetStore>(
  widget: WidgetStoreValue
): RendererPlugin<{}, { widgetKey?: keyof WidgetStoreValue }> {
  return () => {
    return {
      key: 'define-widget',
      wrapField({ field, render }) {
        const WidgetElement = field.widgetKey && widget[field.widgetKey].element;

        if (WidgetElement) return <WidgetElement />;
        return <React.Fragment>{render()}</React.Fragment>;
      },
    };
  };
}
