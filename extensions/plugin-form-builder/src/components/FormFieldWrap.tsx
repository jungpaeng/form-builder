import { DrawRenderArgs, NormalizedFieldData } from '@form-builder/renderer';
import React from 'react';

import { useFormBuilderValueContext } from '../context/FormBuilderValueContext';
import { FieldExtension } from '../formBuilderPlugin';

type FormFieldWrapProps = {
  field: NormalizedFieldData<FieldExtension>;
  render(args: DrawRenderArgs): React.ReactNode;
};

export function FormFieldWrap({ field, render }: FormFieldWrapProps) {
  const { register } = useFormBuilderValueContext();

  return (
    <>
      {!!field.isNotForm && render({})}
      {!field.isNotForm && render({ props: register(field.key) })}
    </>
  );
}
