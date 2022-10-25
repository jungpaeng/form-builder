import React from 'react';
import { UseFormReturn } from 'react-hook-form';

export type FormBuilderValueContextValue = UseFormReturn;

export const FormBuilderValueContext = React.createContext<FormBuilderValueContextValue>(
  {} as FormBuilderValueContextValue
);

export function useFormBuilderValueContext() {
  const context = React.useContext(FormBuilderValueContext);

  if (!context) throw Error('[FormBuilderValueContext] Not found provider component');
  return React.useContext(FormBuilderValueContext);
}
