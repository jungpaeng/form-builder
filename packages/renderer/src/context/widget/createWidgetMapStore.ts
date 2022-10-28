export type CreateWidgetMapStoreOutput = {
  setWidget(name: string, widget: React.ElementType): void;
  getWidget(widget: React.ElementType | string): undefined | React.ElementType;
};

export function createWidgetMapStore(): CreateWidgetMapStoreOutput {
  const widgetMapStore: Record<string, React.ElementType> = {};

  return {
    setWidget(name: string, widget: React.ElementType) {
      if (!widgetMapStore[name]) {
        widgetMapStore[name] = widget;
      }
    },
    getWidget(widget: React.ElementType | string) {
      if (typeof widget !== 'string') return widget;
      if (!widgetMapStore[widget]) return undefined;

      return widgetMapStore[widget];
    },
  };
}
