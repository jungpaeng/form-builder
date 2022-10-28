import { CreateWidgetMapStoreOutput } from '../../context';

export type MetaData<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
> = MetaExtension & {
  /**
   * @description Form에 대한 필드를 정의하는 부분
   */
  fields: FieldData<FieldExtension>[];
};

export type FieldData<FieldExtension extends Record<string, unknown> = {}> = FieldExtension & {
  /**
   * @description ReactNode의 키로 사용됩니다.
   */
  key: string;
  /**
   * @description widgetMap에서 조회하기 위한 위젯 키
   * @description 기본 모드일 때 보여지는 위젯
   */
  widget?: React.ElementType | string;
};

export type NormalizedMetaData<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
> = MetaExtension & {
  fields: NormalizedFieldData<FieldExtension>[];
};

export type NormalizedFieldData<FieldExtension extends Record<string, unknown> = {}> = FieldExtension & {
  key: string;
  widget?: React.ElementType | string;
};

export function normalizeMetaWidget<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
>(
  getWidget: CreateWidgetMapStoreOutput['getWidget'],
  meta: MetaData<MetaExtension, FieldExtension>
): NormalizedMetaData<MetaExtension, FieldExtension> {
  const normalizeFields = meta.fields.map((field) => {
    return { ...field, widget: getWidget(field.widget!) };
  });

  return { ...meta, fields: normalizeFields };
}
