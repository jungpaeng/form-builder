import { formBuilderPlugin } from '@form-builder/plugin-form-builder';
import { renderer } from '@form-builder/renderer';
import React from 'react';

export default { title: 'Welcome', meta: { key: 'value' } };

const { Renderer } = renderer({
  beforeRender: [
    ({ actions: { defineWidget } }) => {
      defineWidget('input', 'input');
      defineWidget('submit', () => <button type="submit">submit</button>);
    },
  ],
  plugins: [formBuilderPlugin()],
});

export const Story = () => (
  <Renderer
    meta={{
      formBuilder: {
        onValidSubmit(data) {
          console.log('test:: data', data);
        },
      },
      fields: [
        { key: 'fields-input-1', widget: 'input' },
        { key: 'fields-input-2', widget: 'input' },
        { key: 'fields-input-3', widget: 'input' },
      ],
    }}
  />
);

Story.storyName = 'FormBuilder';
