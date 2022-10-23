import React from 'react';

import { FieldData, MetaData } from '../utils/meta';

type FormRenderFieldProps = {
  meta: MetaData;
  field: FieldData;
};

export function FormRenderField({ meta, field }: FormRenderFieldProps) {
  return <div>FormRenderField</div>;
}
