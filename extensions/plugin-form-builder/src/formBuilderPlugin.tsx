import { RendererPlugin } from '@form-builder/renderer';
import React from 'react';

import { FormBuilder, FormBuilderProps } from './components';
import { FormFieldWrap } from './components/FormFieldWrap';

type MetaExtension = {
  formBuilder: FormBuilderProps;
};

export function formBuilderPlugin(): RendererPlugin<MetaExtension> {
  return () => {
    return {
      key: 'form-builder',
      wrapRender({ meta, render }) {
        return (
          <FormBuilder
            rootElement={meta.formBuilder.rootElement}
            onValidSubmit={meta.formBuilder.onValidSubmit}
            onInValidSubmit={meta.formBuilder.onInValidSubmit}
          >
            {render()}
            <button type="submit">submit</button>
          </FormBuilder>
        );
      },
      wrapField({ field, render }) {
        return <FormFieldWrap formKey={field.key}>{render()}</FormFieldWrap>;
      },
    };
  };
}
