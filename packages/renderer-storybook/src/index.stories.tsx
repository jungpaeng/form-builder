import { renderer } from '@form-builder/renderer';
import React from 'react';

export default {
  title: 'Welcome',
  meta: { key: 'value' },
};

const { Renderer } = renderer();

export const Story = () => (
  <div>
    <Renderer />
  </div>
);
Story.storyName = 'Test';
