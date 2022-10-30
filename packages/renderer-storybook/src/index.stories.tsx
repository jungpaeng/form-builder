import { defineWidgetPlugin } from '@form-builder/plugin-define-widget';
import { renderer, RendererPlugin } from '@form-builder/renderer';
import React from 'react';

export default { title: 'Welcome', meta: { key: 'value' } };

const { Renderer } = renderer({
  plugins: [
    defineWidgetPlugin({
      input: { element: () => <input value="custom-input" /> },
    }),
    drawPlugin(),
  ],
});

export const Story = () => (
  <Renderer
    meta={{
      fields: [
        { key: 'fields-input-1', element: 'input' },
        { key: 'fields-input-2', widgetKey: 'input' },
        { key: 'fields-input-3', widgetKey: 'input' },
        {
          key: 'fields-submit',
          element: () => <button type="submit">submit</button>,
        },
      ],
    }}
  />
);

Story.storyName = 'FormBuilder';

function drawPlugin(): RendererPlugin {
  return () => {
    return {
      key: 'draw',
      draw({ render }) {
        return (
          <div className="draw-render">
            {render().fields.map(({ field, render }) => (
              <React.Fragment key={field.key}>{render()}</React.Fragment>
            ))}
          </div>
        );
      },
    };
  };
}
