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
        key: 'plugin-1',
        onInit() {
          console.log('plugin-1 onInit');
        },
      };
    },
  ],
});

export const Story = () => (
  <div>
    <Renderer />
  </div>
);
Story.storyName = 'Test';
