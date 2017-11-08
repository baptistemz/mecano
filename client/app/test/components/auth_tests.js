import React from 'react';
import { MemoryRouter } from 'react-router';
import { renderComponent, expect } from '../test_helper';
import Login from '../../bundle/components/Login.jsx';
import Signup from '../../bundle/components/Signup.jsx';

describe('Login', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(Login, { location: {pathname: 'login', state: { redirected: false }} })
  });
  it('displays two fields', () => {
    expect(component.find('input').length).to.equal(2);
  });
  it('edits well the fields', () => {
    component.find('input').first().simulate('change', 'michel@michel.com');
    expect(component.find('input').first()).to.have.value('michel@michel.com');
    component.find('input').last().simulate('change', '12345678');
    expect(component.find('input').last()).to.have.value('12345678');
  });
});

describe('Signup', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(Signup, { location: {state: { redirected: false }} })
  });
  it('displays five fields', () => {
    expect(component.find('input').length).to.equal(5);
  });
});
