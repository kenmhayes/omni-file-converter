import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

it('renders a navbar with links', () => {
  // A router is necessary for Links to work
  const component = create(
    <MemoryRouter>
      <Header/ >
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
