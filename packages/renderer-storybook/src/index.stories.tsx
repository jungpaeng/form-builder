import { renderer } from '@form-builder/renderer';
import React from 'react';

export default {
  title: 'Welcome',
  meta: { key: 'value' },
};

const { Renderer } = renderer({
  beforeRender: [
    ({ actions: { defineWidget } }) => {
      defineWidget('div', { widget: 'div' });
      defineWidget('span', { widget: 'span' });
      defineWidget('input', { widget: 'input' });
    },
  ],
});

export const Story = () => (
  <Renderer
    meta={{
      fields: [
        { key: 'fields-1', widget: 'div' },
        { key: 'fields-2', widget: 'span' },
      ],
    }}
  />
);
Story.storyName = 'Test';
