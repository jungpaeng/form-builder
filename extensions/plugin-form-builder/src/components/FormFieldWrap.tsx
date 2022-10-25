import React from 'react';

import { useFormBuilderValueContext } from '../context/FormBuilderValueContext';

type FormFieldWrapProps = {
  formKey: string;
};

export function FormFieldWrap({ formKey }: React.PropsWithChildren<FormFieldWrapProps>) {
  const { register } = useFormBuilderValueContext();

  return <input {...register(formKey)} />;
}
