import React from 'react';

import { normalizeMetaWidget } from './meta';
import { defineWidget } from './widget';

describe('normalizeMetaWidget', function () {
  const Input = () => <input />;

  beforeAll(function () {
    defineWidget('div', { widget: 'div' });
    defineWidget('input', { widget: 'input' });
    defineWidget('meta', {
      widget: Input,
      metaConvertor(field) {
        return { ...field, key: 'meta' };
      },
    });
  });

  it('should be meta.widget is in widgetMap', function () {
    const meta1 = normalizeMetaWidget({
      fields: [
        { key: 'key-1', widget: 'div' },
        { key: 'key-2', widget: 'input' },
        { key: 'key-3', widget: Input },
      ],
    });

    expect(meta1.fields[0].widget).toEqual('div');
    expect(meta1.fields[1].widget).toEqual('input');
    expect(meta1.fields[2].widget).toEqual(Input);
  });

  it('should be widget is return metaConvertor function', function () {
    const meta1 = normalizeMetaWidget({ fields: [{ key: '', widget: 'meta' }] });

    expect(meta1.fields[0].widget).toEqual(Input);
    expect(meta1.fields[0].key).toEqual('meta');
  });
});
