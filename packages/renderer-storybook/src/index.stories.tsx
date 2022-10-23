import { renderer } from '@form-builder/renderer';
import React from 'react';

export default {
  title: 'Welcome',
  meta: { key: 'value' },
};

const { Renderer } = renderer({
  beforeRender: [
    ({ actions: { defineWidget } }) => {
      defineWidget('div', { widget: <div /> });
      defineWidget('span', { widget: <span /> });
      defineWidget('input', { widget: <input /> });
    },
  ],
  plugins: [
    () => {
      return {
        key: 'basic element',
        onInit() {},
      };
    },
  ],
});

export const Story = () => <Renderer />;
Story.storyName = 'Test';
