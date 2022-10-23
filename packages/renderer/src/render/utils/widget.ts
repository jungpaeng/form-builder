import { FieldData } from './meta';

export type WidgetKey = React.ElementType | string;
type Widget = {
  /**
   * @description
   */
  widget: React.ElementType;
  /**
   * @description field의 widget 또는 viewWidget을 변환하는 함수입니다.
   */
  metaConvertor?(field: FieldData): FieldData;
};

export const widgetMap: Record<string, Widget> = {};

export function defineWidget(name: string, widgetValue: Widget) {
  if (widgetMap[name]) throw new Error(`widget ${name} is already defined`);
  widgetMap[name] = widgetValue;
}

/**
 * @description ReactNode를 전달받았을 경우, 해당 ReactNode를 반환합니다.
 * @description string을 전달받았을 경우, widgetMap에서 해당 widget을 반환합니다.
 */
export function getWidget(widget: WidgetKey) {
  if (typeof widget !== 'string') return widget;

  if (!widgetMap[widget].widget) throw new Error(`widget ${widget} is not defined`);
  return widgetMap[widget].widget;
}
