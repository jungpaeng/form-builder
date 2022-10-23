import { getWidget, WidgetKey, widgetMap } from './widget';

export type MetaData = {
  /**
   * @description Form에 대한 필드를 정의하는 부분
   */
  fields: FieldData[];
  /**
   * @description 전체 폼에 viewMode를 적용시킵니다.
   */
  viewMode?: boolean;
};
export type FieldData = {
  /**
   * @description ReactNode의 키로 사용됩니다.
   */
  key: string;
  /**
   * @description widgetMap에서 조회하기 위한 위젯 키
   * @description 기본 모드일 때 보여지는 위젯
   */
  widget?: WidgetKey;
  /**
   * @description widgetMap에서 조회하기 위한 위젯 키
   * @description 뷰 모드일 때 보여지는 위젯
   */
  viewWidget?: WidgetKey;
  /**
   * @description 해당 필드에 viewMode를 적용시킵니다.
   */
  viewMode?: boolean;
};

export function normalizeMetaWidget(meta: MetaData): MetaData {
  const normalizeFields: FieldData[] = meta.fields.map((field) => {
    const widget = getWidget(field.widget!);
    const viewWidget = getWidget(field.viewWidget!);

    const currentItemKey = Object.keys(widgetMap).find((item) => {
      return item === field.widget;
    });

    if (currentItemKey && widgetMap[currentItemKey]?.metaConvertor) {
      const newField = widgetMap[currentItemKey].metaConvertor!(field);

      if (!newField) {
        throw new Error(`metaConvertor of ${field.widget} must return a value`);
      }
      return { ...newField, widget, viewWidget };
    }

    return { ...field, widget, viewWidget };
  });

  return { ...meta, fields: normalizeFields };
}
