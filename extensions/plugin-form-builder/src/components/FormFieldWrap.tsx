import React from 'react';

type FormFieldWrapProps = {
  formKey: string;
};

export function FormFieldWrap({ formKey, children }: React.PropsWithChildren<FormFieldWrapProps>) {
  return <>{children}</>;
}
