import { defineWidgetPlugin, WidgetValueData } from '@form-builder/plugin-define-widget';
import { renderer, RendererPlugin } from '@form-builder/renderer';
import React from 'react';

export default { title: 'Welcome', meta: { key: 'value' } };

const input: WidgetValueData<{ widgetKey: 'input'; value: string }> = {
  element: 'input',
};
const select: WidgetValueData<{ widgetKey: 'select'; options: string[] }> = {
  element: 'select',
};
const button: WidgetValueData<{ widgetKey: 'button'; type: string }> = {
  element: 'button',
};

const { Renderer } = renderer({
  plugins: [defineWidgetPlugin({ input, select, button }), drawPlugin()],
});

export const Story = () => (
  <Renderer
    meta={{
      fields: [
        { key: 'fullName', widgetKey: 'input', value: '' },
        { key: 'email', widgetKey: 'input', value: '' },
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
            {render().fields.map(({ field, render }) => {
              return <React.Fragment key={field.key}>{render()}</React.Fragment>;
            })}
          </div>
        );
      },
    };
  };
}
