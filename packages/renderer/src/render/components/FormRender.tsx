import React from 'react';

import { usePluginContext } from '../../plugins';
import { MetaData, normalizeMetaWidget } from '../utils/meta';
import { FormRenderField } from './FormRenderField';

export type FormRenderProps<MetaExtension extends Record<string, unknown> = {}> = {
  meta: MetaData<MetaExtension> | (() => MetaData<MetaExtension>);
};

export function FormRender<MetaExtension extends Record<string, unknown> = {}>({
  meta,
}: FormRenderProps<MetaExtension>) {
  const plugin = usePluginContext();

  const metaData = typeof meta === 'function' ? meta() : meta;
  const normalizedMetaWidget = normalizeMetaWidget(metaData);

  const { fields } = normalizedMetaWidget;
  let outputNode: React.ReactElement = (
    <>
      {fields.map((field) => {
        return <FormRenderField key={field.key} meta={normalizedMetaWidget} field={field} />;
      })}
    </>
  );

  plugin.forEach((plugin) => {
    outputNode =
      plugin.wrapRender?.({
        meta: metaData,
        render: () => outputNode,
      }) ?? outputNode;
  });

  return outputNode;
}
