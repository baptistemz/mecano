import React from 'react';
import { renderComponent, expect } from '../test_helper';
import Home from '../../bundle/components/Home.jsx';

describe('Home', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(Home)
  });
  it('displays the banner', () => {
    expect(component.find('.banner')).to.exist;
  });
  it('displays the CTAs', () => {
    expect(component.find('.banner')).to.exist;
  });
});
