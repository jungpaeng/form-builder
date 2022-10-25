import { RendererPlugin } from '@form-builder/renderer';
import React from 'react';

export function formBuilderPlugin(): RendererPlugin<{ metaTest?: string }, { fieldTest?: string }> {
  return () => {
    return {
      key: 'form-builder',
      wrapRender({ render }) {
        return <div className="form-builder">{render()}</div>;
      },
    };
  };
}
