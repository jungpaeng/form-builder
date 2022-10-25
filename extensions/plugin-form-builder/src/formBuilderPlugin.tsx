import { RendererPlugin } from '@form-builder/renderer';
import React from 'react';

import { FormBuilder, FormBuilderProps } from './components';

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
          </FormBuilder>
        );
      },
      wrapField({ render }) {
        return <div className="form-builder-field">{render()}</div>;
      },
    };
  };
}
