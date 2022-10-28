import React from 'react';

import { createWidgetMapStore } from './createWidgetMapStore';

describe('createWidgetMapStore', function () {
  const store = createWidgetMapStore();

  beforeAll(function () {
    store.setWidget('div', 'div');
    store.setWidget('input', Input);
  });

  it('should be get widget as it is', function () {
    expect(store.getWidget('div')).toEqual('div');
    expect(store.getWidget('input')).toEqual(Input);
  });

  it('should be get widget bypass', function () {
    const Comp = () => <div />;
    expect(store.getWidget(Comp)).toEqual(Comp);
  });

  it('should be return undefined', function () {
    expect(store.getWidget('key')).toEqual(undefined);
  });
});

const Input = () => <input />;
