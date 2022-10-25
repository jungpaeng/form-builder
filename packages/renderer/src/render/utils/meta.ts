import { getWidget, WidgetKey, widgetMap } from './widget';

export type MetaData = {
  /**
   * @description Form에 대한 필드를 정의하는 부분
   */
  fields: FieldData[];
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
};

export function normalizeMetaWidget(meta: MetaData) {
  const normalizeFields = meta.fields.map((field) => {
    const widget = getWidget(field.widget!);
    const currentItemKey = Object.keys(widgetMap).find((item) => item === field.widget);

    if (currentItemKey && widgetMap[currentItemKey]?.metaConvertor) {
      const newField = widgetMap[currentItemKey].metaConvertor!(field);

      if (!newField) {
        throw new Error(`metaConvertor of ${field.widget} must return a value`);
      }
      return { ...newField, widget };
    }

    return { ...field, widget };
  });

  return { ...meta, fields: normalizeFields };
}
