import React from 'react';

import { normalizeMetaWidget } from './meta';
import { defineWidget } from './widget';

describe('normalizeMetaWidget', function () {
  beforeAll(function () {
    defineWidget('div', { widget: <div /> });
    defineWidget('input', { widget: <input /> });
    defineWidget('metaConvertor', {
      widget: <input />,
      metaConvertor(field) {
        return { ...field, key: 'meta' };
      },
    });
  });

  it('should be meta.widget is in widgetMap', function () {
    const meta1 = normalizeMetaWidget({ fields: [{ key: '', widget: 'div' }] });
    expect(meta1.fields[0].widget).toEqual(<div />);

    const meta2 = normalizeMetaWidget({ fields: [{ key: '', widget: 'input' }] });
    expect(meta2.fields[0].widget).toEqual(<input />);
  });

  it('should be widget is passed at ReactNode', function () {
    const meta1 = normalizeMetaWidget({ fields: [{ key: '', widget: <input /> }] });
    expect(meta1.fields[0].widget).toEqual(<input />);
  });

  it('should be widget is return metaConvertor function', function () {
    const meta1 = normalizeMetaWidget({ fields: [{ key: '', widget: 'metaConvertor' }] });
    expect(meta1.fields[0].key).toEqual('meta');
  });
});
