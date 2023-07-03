import React from 'react';
import { act, create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import * as APIHelper from '../aws/APIHelper';
import ConversionSession from './ConversionSession';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const apiSpy = jest.spyOn(APIHelper, 'getSession');

describe('ConversionSession', () => {
    it('renders a conversion session', async () => {
        let component= create(
            <MemoryRouter initialEntries={["/1234"]}>
                <Routes>
                    <Route path="/:sessionId" element={<ConversionSession/>}>
                    </Route>
                </Routes>
            </MemoryRouter>
        );;

        expect(component.toJSON()).toMatchSnapshot();
    });

    it('loads session data after API call', async () => {
        apiSpy.mockResolvedValue({
            expirationTime: 188888888,
            conversions: [
                {
                    fileName: 'test1.jpg',
                    id: '123',
                    conversionStatus: 'COMPLETED',
                    originalFileFormat: 'jpg',
                    convertedFileFormat: 'png',
                }
            ]
        });
        let component = (<MemoryRouter initialEntries={["/1234"]}>
                            <Routes>
                                <Route path="/:sessionId" element={<ConversionSession/>}>
                                </Route>
                            </Routes>
                    </MemoryRouter>);
        const { findByRole, rerender } = render(component);

        expect(await findByRole("alert")).toBeInTheDocument();
        expect(apiSpy).toHaveBeenCalledWith("1234");
    });
});

