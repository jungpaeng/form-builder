import React from 'react';

import { usePluginContext } from '../../plugins';
import { MetaData, normalizeMetaWidget } from '../utils/meta';
import { FormRenderField } from './FormRenderField';

export type FormRenderProps<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
> = {
  meta: MetaData<MetaExtension, FieldExtension> | (() => MetaData<MetaExtension, FieldExtension>);
};

export function FormRender<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
>({ meta }: FormRenderProps<MetaExtension, FieldExtension>) {
  const plugins = usePluginContext();

  const metaData = typeof meta === 'function' ? meta() : meta;
  const normalizedMetaWidget = normalizeMetaWidget(metaData);

  let outputNode: React.ReactElement = (
    <>
      {plugins
        .filter((plugin) => !!plugin.draw)
        .map((plugin) => {
          return <FormRenderField key={plugin.key} meta={normalizedMetaWidget} plugin={plugin} />;
        })}
    </>
  );

  plugins.forEach((plugin) => {
    outputNode =
      plugin.wrapRender?.({
        meta: normalizedMetaWidget,
        render: () => outputNode,
      }) ?? outputNode;
  });

  return outputNode;
}
