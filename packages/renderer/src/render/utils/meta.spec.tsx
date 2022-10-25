import React from 'react';

import { normalizeMetaWidget } from './meta';
import { defineWidget } from './widget';

describe('normalizeMetaWidget', function () {
  const Input = () => <input />;

  beforeAll(function () {
    defineWidget('div', 'div');
    defineWidget('input', 'input');
    defineWidget('meta', Input);
  });

  it('should be meta.widget is in widgetMap', function () {
    const meta1 = normalizeMetaWidget({
      fields: [
        { key: 'key-1', widget: 'div' },
        { key: 'key-2', widget: 'input' },
        { key: 'key-3', widget: 'meta' },
        { key: 'key-4', widget: Input },
      ],
    });

    expect(meta1.fields[0].widget).toEqual('div');
    expect(meta1.fields[1].widget).toEqual('input');
    expect(meta1.fields[2].widget).toEqual(Input);
    expect(meta1.fields[3].widget).toEqual(Input);
  });
});
