import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { FormBuilderValueContext } from '../context/FormBuilderValueContext';

export type FormBuilderProps = {
  /**
   * @description 렌더링할 컴포넌트를 주입합니다.
   * @description `onSubmit`이 `props`로 주입됩니다.
   */
  rootElement?: React.ElementType<{ onSubmit?: React.FormEventHandler }>;
  onValidSubmit(data: unknown, event?: React.BaseSyntheticEvent): void;
  onInValidSubmit?(error: FieldErrors, event?: React.BaseSyntheticEvent): void;
};

export function FormBuilder(props: React.PropsWithChildren<FormBuilderProps>) {
  const form = useForm();
  const { rootElement: RootElement = 'form', onValidSubmit, onInValidSubmit, children } = props;

  return (
    <FormBuilderValueContext.Provider value={form}>
      <RootElement onSubmit={form.handleSubmit(onValidSubmit, onInValidSubmit)}>{children}</RootElement>
    </FormBuilderValueContext.Provider>
  );
}
