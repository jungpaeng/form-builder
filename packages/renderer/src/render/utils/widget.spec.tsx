import React from 'react';

import { defineWidget, getWidget, widgetMap } from './widget';

describe('widget', function () {
  beforeAll(function () {
    defineWidget('div', { widget: 'div' });
    defineWidget('input', { widget: Input });
  });

  it('should be set widgetMap', function () {
    expect(widgetMap).toEqual({
      div: { widget: 'div' },
      input: { widget: Input },
    });
  });

  it('should be get widget as it is', function () {
    expect(getWidget('div')).toEqual('div');
  });

  it('should be get widget from widgetMap', function () {
    expect(getWidget('div')).toEqual('div');
    expect(getWidget('input')).toEqual(Input);
  });
});

const Input = () => <input />;
