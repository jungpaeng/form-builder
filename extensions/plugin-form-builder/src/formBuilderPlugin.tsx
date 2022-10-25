import { RendererPlugin } from '@form-builder/renderer';
import React from 'react';

import { FormBuilder, FormBuilderProps, FormFieldWrap } from './components';

export type MetaExtension = {
  formBuilder: FormBuilderProps;
};

export type FieldExtension = {
  isNotForm?: boolean;
};

export function formBuilderPlugin(): RendererPlugin<MetaExtension, FieldExtension> {
  return () => {
    return {
      key: 'form-builder',
      draw({ meta, render }) {
        return (
          <FormBuilder
            rootElement={meta.formBuilder.rootElement}
            onValidSubmit={meta.formBuilder.onValidSubmit}
            onInValidSubmit={meta.formBuilder.onInValidSubmit}
          >
            {render().fields.map(({ field, render }) => {
              return <FormFieldWrap key={field.key} field={field} render={render} />;
            })}
          </FormBuilder>
        );
      },
    };
  };
}
