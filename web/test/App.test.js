import React from 'react';
import { renderWithProviders, renderWithRouter, screen} from "@tests/base"
import userEvent from '@testing-library/user-event';
import { App } from "../src/App"
import { act } from 'react-test-renderer';

describe('App', () => {
    it('renders AppBar component with default title', () => {
        act(() => {
            renderWithRouter(<App />)
        })

        expect(screen.getByTestId('menu-bar')).toBeInTheDocument()
    })
})