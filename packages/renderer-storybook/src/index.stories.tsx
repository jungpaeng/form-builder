import { formBuilderPlugin } from '@form-builder/plugin-form-builder';
import { renderer } from '@form-builder/renderer';
import React from 'react';

export default { title: 'Welcome', meta: { key: 'value' } };

const { Renderer } = renderer({
  beforeRender: [
    ({ actions: { defineWidget } }) => {
      defineWidget('div', { widget: 'div' });
      defineWidget('span', { widget: 'span' });
      defineWidget('input', { widget: 'input' });
    },
  ],
  plugins: [
    () => {
      return {
        key: 'wrap - stack',
        wrapRender({ render }) {
          return <CountWrapper>{render()}</CountWrapper>;
        },
      };
    },
  ],
});

export const Story = () => (
  <div>
    <Renderer
      meta={{
        fields: [
          { key: 'fields-1', widget: 'div' },
          { key: 'fields-2', widget: 'span' },
        ],
      }}
    />
  </div>
);

Story.storyName = 'FormBuilder';
