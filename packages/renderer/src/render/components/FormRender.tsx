import React from 'react';

import { MetaData, normalizeMetaWidget } from '../utils/meta';
import { FormRenderField } from './FormRenderField';

export type FormRenderProps = {
  meta: MetaData | (() => MetaData);
};

export function FormRender({ meta }: FormRenderProps) {
  const metaData = typeof meta === 'function' ? meta() : meta;
  const normalizedMetaWidget = normalizeMetaWidget(metaData);

  const { fields } = normalizedMetaWidget;
  const elementList = fields.map((field) => {
    return <FormRenderField key={field.key} meta={normalizedMetaWidget} field={field} />;
  });

  return <>{elementList}</>;
}
