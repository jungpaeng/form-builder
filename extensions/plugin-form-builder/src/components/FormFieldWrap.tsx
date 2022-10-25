import React from 'react';

type FormFieldWrapProps = {
  formKey: string;
};

export function FormFieldWrap({ formKey, children }: React.PropsWithChildren<FormFieldWrapProps>) {
  console.log('test:: formKey', formKey);
  return <div>{children}</div>;
}
