import React from 'react';

import { usePluginContext } from '../../plugins';
import { MetaData, normalizeMetaWidget } from '../utils/meta';
import { FormRenderField } from './FormRenderField';

export type FormRenderProps = {
  meta: MetaData | (() => MetaData);
};

export function FormRender({ meta }: FormRenderProps) {
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
        render() {
          return outputNode;
        },
      }) ?? outputNode;
  });

  return outputNode;
}
