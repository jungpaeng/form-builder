import { renderer } from '@form-builder/renderer';
import React from 'react';

export default {
  title: 'Welcome',
  meta: { key: 'value' },
};

const { Renderer } = renderer({
  plugins: [
    () => {
      return {
        key: 'basic element',
        onInit({ actions: { defineWidget } }) {
          defineWidget('div', { widget: <div /> });
          defineWidget('span', { widget: <span /> });
          defineWidget('input', { widget: <input /> });
        },
      };
    },
  ],
});

export const Story = () => <Renderer />;
Story.storyName = 'Test';
