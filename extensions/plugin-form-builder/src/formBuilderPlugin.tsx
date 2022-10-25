import { RendererPlugin } from '@form-builder/renderer';
import React from 'react';

import { FormBuilder, FormBuilderProps, FormFieldWrap } from './components';

type MetaExtension = {
  formBuilder: FormBuilderProps;
};

export function formBuilderPlugin(): RendererPlugin<MetaExtension> {
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
              return <FormFieldWrap key={field.key} formKey={field.key} render={render} />;
            })}
          </FormBuilder>
        );
      },
    };
  };
}
