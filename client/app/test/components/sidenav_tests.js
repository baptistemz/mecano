import React from 'react';
import { renderComponent, expect, findElement } from '../test_helper';
import SideNav from '../../bundle/components/SideNav.jsx';

describe('SideNav', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(SideNav)
  });
  it('displays well the thumbnails', () => {

  });
  it('links to the Home', () => {

  });
  it('links to the mecano search', () => {

  });
  it('links to the mecano registration if not mecano yet', () => {

  });
  it('links to my account log off if connected', () => {

  });
  it('links to sign in and sign up if not connected', () => {

  });
  it('links to the my account if connected', () => {

  });

  describe('burger menu', () => {
    it('activates the SideNav', () => {

    });
    it('Displays the SideNav when activated', () => {

    });
  });
});
