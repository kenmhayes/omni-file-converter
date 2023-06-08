import React from 'react';
import { create } from 'react-test-renderer';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

it('renders an errorpage with a not found message', () => {
  //data MemoryRouter is necessary for errors to work

  const routes = [
    {
      path: "/",
      element: <div>Test</div>,
      errorElement: <ErrorPage/>
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/fake"],
    initialIndex: 1,
  });

  const component = create(
    <RouterProvider router={router} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
