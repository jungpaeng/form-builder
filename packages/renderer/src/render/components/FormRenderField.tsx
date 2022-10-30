import React from 'react';

import { RendererPlugin, usePluginContext } from '../../plugins';
import { MetaData } from '../utils/meta';

type FormRenderFieldProps<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
> = {
  meta: MetaData<MetaExtension, FieldExtension>;
  plugin: ReturnType<RendererPlugin>;
};

export function FormRenderField<
  MetaExtension extends Record<string, unknown> = {},
  FieldExtension extends Record<string, unknown> = {}
>({ meta, plugin }: FormRenderFieldProps<MetaExtension, FieldExtension>) {
  const plugins = usePluginContext();

  return plugin.draw!({
    meta,
    render() {
      return {
        fields: meta.fields.map((field) => {
          return {
            field,
            render(args) {
              let outputNode = <>{!!field.element ? <field.element {...args?.props} /> : null}</>;

              plugins.forEach((plugin) => {
                outputNode =
                  plugin.wrapField?.({
                    field: field,
                    render: () => outputNode,
                  }) ?? outputNode;
              });

              return outputNode;
            },
          };
        }),
      };
    },
  });
}
