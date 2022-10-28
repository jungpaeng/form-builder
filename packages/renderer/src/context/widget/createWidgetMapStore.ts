type WidgetValue<WidgetOption extends Record<string, unknown> = {}> = WidgetOption & {
  element: React.ElementType;
};

export type CreateWidgetMapStoreOutput<WidgetOption extends Record<string, unknown> = {}> = {
  setWidget(name: string, value: WidgetValue<WidgetOption>): void;
  getWidget(widget: React.ElementType | string): WidgetValue<WidgetOption> | undefined;
};

export function createWidgetMapStore<
  WidgetOption extends Record<string, unknown> = {}
>(): CreateWidgetMapStoreOutput<WidgetOption> {
  const widgetMapStore: Record<string, WidgetValue<WidgetOption>> = {};

  return {
    setWidget(name, option) {
      if (!widgetMapStore[name]) {
        widgetMapStore[name] = option;
      }
    },
    getWidget(widget) {
      if (typeof widget !== 'string') return undefined;
      if (!widgetMapStore[widget]) return undefined;

      return widgetMapStore[widget];
    },
  };
}
