import React from 'react';

import { usePluginContext } from '../../plugins';
import { NormalizedMetaData, NormalizedFieldData } from '../utils/meta';

type FormRenderFieldProps<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
> = {
  meta: NormalizedMetaData<MetaExtension, FieldExtension>;
  field: NormalizedFieldData<FieldExtension>;
};

export function FormRenderField<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
>({ field }: FormRenderFieldProps<MetaExtension, FieldExtension>) {
  const plugin = usePluginContext();

  let outputNode = <>{!!field.widget ? <field.widget /> : null}</>;

  plugin.forEach((plugin) => {
    outputNode =
      plugin.wrapField?.({
        field: field,
        render: () => outputNode,
      }) ?? outputNode;
  });

  return outputNode;
}
