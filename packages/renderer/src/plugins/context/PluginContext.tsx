import React from 'react';

import { defineWidget } from '../../render/utils';

export type FormBuilderRendererPlugin = () => {
  /**
   * @description 플러그인이 React Tree로 흡수될 때 부여되는 고유한 키
   */
  key: string;
  /**
   * @description Renderer 컴포넌트가 처음 호출될 때 실행됩니다.
   */
  onInit?: (args: { actions: { defineWidget: typeof defineWidget } }) => void;
};

type PluginContextValue = Array<ReturnType<FormBuilderRendererPlugin>>;

export const PluginContext = React.createContext<PluginContextValue>([]);

export function usePluginContext() {
  const context = React.useContext(PluginContext);

  if (!context) throw Error('[PluginContext] Not found provider component');
  return context;
}
