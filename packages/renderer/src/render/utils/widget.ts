export type WidgetKey = React.ElementType | string;

export const widgetMap: Record<string, React.ElementType> = {};

export function defineWidget(name: string, widgetValue: React.ElementType) {
  if (widgetMap[name]) throw new Error(`widget ${name} is already defined`);
  widgetMap[name] = widgetValue;
}

/**
 * @description ReactNode를 전달받았을 경우, 해당 ReactNode를 반환합니다.
 * @description string을 전달받았을 경우, widgetMap에서 해당 widget을 반환합니다.
 */
export function getWidget(widget: WidgetKey) {
  if (typeof widget !== 'string') return widget;

  if (!widgetMap[widget]) throw new Error(`widget ${widget} is not defined`);
  return widgetMap[widget];
}
