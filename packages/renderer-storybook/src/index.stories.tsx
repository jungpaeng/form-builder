import { FormBuilder, formBuilderPlugin } from '@form-builder/plugin-form-builder';
import { renderer } from '@form-builder/renderer';
import React from 'react';

export default { title: 'Welcome', meta: { key: 'value' } };

const { Renderer } = renderer({
  beforeRender: [
    ({ actions: { defineWidget } }) => {
      defineWidget('div', { widget: () => <p>div widget</p> });
      defineWidget('span', { widget: () => <p>span widget</p> });
      defineWidget('input', { widget: () => <p>input widget</p> });
    },
  ],
  plugins: [formBuilderPlugin()],
});

export const Story = () => (
  <FormBuilder onValidSubmit={(data) => console.log('test:: data', data)}>
    <Renderer
      meta={{
        fields: [
          { key: 'fields-div', widget: 'div' },
          { key: 'fields-span', widget: 'span' },
          { key: 'fields-input', widget: 'input' },
        ],
      }}
    />
    <button type="submit">Submit</button>
  </FormBuilder>
);

Story.storyName = 'FormBuilder';
