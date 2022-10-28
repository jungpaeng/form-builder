import React from 'react';

import { createWidgetMapStore } from './createWidgetMapStore';

describe('createWidgetMapStore', function () {
  const store = createWidgetMapStore();

  beforeAll(function () {
    store.setWidget('div', { element: 'div' });
    store.setWidget('input', { element: Input });
  });

  it('should be get widget as it is', function () {
    expect(store.getWidget('div')?.element).toEqual('div');
    expect(store.getWidget('input')?.element).toEqual(Input);
  });

  it('should be return undefined', function () {
    const Comp = () => <div />;
    expect(store.getWidget(Comp)?.element).toEqual(undefined);
    expect(store.getWidget('key')?.element).toEqual(undefined);
  });
});

const Input = () => <input />;
