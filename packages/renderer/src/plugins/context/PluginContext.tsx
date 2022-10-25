import React from 'react';

import { MetaData } from '../../render/utils/meta';

export type RendererPlugin<MetaExtension extends Record<string, unknown> = {}> = () => {
  /**
   * @description 플러그인이 React Tree로 흡수될 때 부여되는 고유한 키
   */
  key: string;
  /**
   * @description Renderer 컴포넌트가 처음 호출될 때 실행됩니다.
   */
  onInit?(): void;
  /**
   * @description Render 컴포넌트를 Provider 또는 커스텀 컴포넌트로 감싸는 기능을 제공합니다.
   */
  wrapRender?(args: { meta: MetaData<MetaExtension>; render(): React.ReactNode }): React.ReactElement | null;
};

type PluginContextValue = Array<ReturnType<RendererPlugin>>;

export const PluginContext = React.createContext<PluginContextValue>([]);

export function usePluginContext() {
  const context = React.useContext(PluginContext);

  if (!context) throw Error('[PluginContext] Not found provider component');
  return context;
}
