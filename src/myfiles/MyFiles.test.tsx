import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import MyFiles from '../myfiles/MyFiles';
import { fireEvent, render, waitFor } from '@testing-library/react';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

it('renders a session search page', () => {
    const component = create(
        <MemoryRouter>
            <MyFiles />
        </MemoryRouter>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
});

it('searches based on session id', async () => {
    const sessionId = '12345';

    const { getByRole, getByLabelText } = render(
        <MemoryRouter>
            <MyFiles />
        </MemoryRouter>
    );

    const input = getByLabelText('Session ID');

    await fireEvent.change(input, { target: { value: sessionId}});

    await fireEvent.click(getByRole('button'));

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/' + sessionId);
});
