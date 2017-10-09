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
  describe('CTAs', () => {
    it('links to mecano search', () => {
      // component.find('button').first().simulate('click');
    });
    it('links to mecano profile if already mecano', () => {

    });
    it('links to mecano creation if not already mecano', () => {

    });
  });
});
