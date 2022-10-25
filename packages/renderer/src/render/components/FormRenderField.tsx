import React from 'react';

import { usePluginContext } from '../../plugins';
import { FieldData, MetaData } from '../utils/meta';

type FormRenderFieldProps<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
> = {
  meta: MetaData<MetaExtension, FieldExtension>;
  field: FieldData<FieldExtension>;
};

export function FormRenderField<FieldExtension extends Record<string, unknown> = {}>({
  field,
}: FormRenderFieldProps<FieldExtension>) {
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
