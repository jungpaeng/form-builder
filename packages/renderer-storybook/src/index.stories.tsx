import { formBuilderPlugin } from '@form-builder/plugin-form-builder';
import { renderer } from '@form-builder/renderer';
import React from 'react';

export default { title: 'Welcome', meta: { key: 'value' } };

const { Renderer } = renderer({
  defineWidgets: [
    ({ defineWidget }) => {
      defineWidget('input', { element: 'input' });
      defineWidget('submit', { element: () => <button type="submit">submit</button> });
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
        { key: 'fields-submit', widget: 'submit', isNotForm: true },
      ],
    }}
  />
);

Story.storyName = 'FormBuilder';
