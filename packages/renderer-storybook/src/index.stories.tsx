import { formBuilderPlugin } from '@form-builder/plugin-form-builder';
import { renderer } from '@form-builder/renderer';
import React from 'react';

export default { title: 'Welcome', meta: { key: 'value' } };

const { Renderer } = renderer({
  beforeRender: [
    ({ actions: { defineWidget } }) => {
      defineWidget('div', () => <p>div widget</p>);
      defineWidget('span', () => <p>span widget</p>);
      defineWidget('input', () => <p>input widget</p>);
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
        { key: 'fields-div', widget: 'div' },
        { key: 'fields-span', widget: 'span' },
        { key: 'fields-input', widget: 'input' },
        { key: 'fields-submit', widget: 'submit' },
      ],
    }}
  />
);

Story.storyName = 'FormBuilder';
