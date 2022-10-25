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

function CountWrapper({ children }: React.PropsWithChildren) {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((curr) => curr + 1)}>Add</button>
      <div>{children}</div>
    </div>
  );
}

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
Story.storyName = 'Test';
