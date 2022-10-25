import { defineWidget } from '../render/utils';

export type BeforeRenderAction = (args: {
  actions: {
    defineWidget: typeof defineWidget;
  };
}) => void;
