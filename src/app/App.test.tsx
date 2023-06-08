import React from 'react';
import { create } from 'react-test-renderer';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

it('renders a navbar and content', () => {
  // A router is necessary for Links to work
  const component = create(
    <MemoryRouter>
      <App/ >
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
