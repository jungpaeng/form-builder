import { DrawRenderArgs } from '@form-builder/renderer';
import React from 'react';

import { useFormBuilderValueContext } from '../context/FormBuilderValueContext';

type FormFieldWrapProps = {
  formKey: string;
  render(args: DrawRenderArgs): React.ReactNode;
};

export function FormFieldWrap({ formKey, render }: FormFieldWrapProps) {
  const { register } = useFormBuilderValueContext();

  return (
    <>
      {render({
        props: register(formKey),
      })}
    </>
  );
}
