import React from 'react';
import { renderWithProviders, renderWithRouter, screen} from "@tests/base"
import { App } from "../src/App"
import { act } from 'react-test-renderer';

describe('App', () => {
    it('renders AppBar component with default title', async () => {
        let menuBar;
        renderWithProviders()

        await act(() => {
            menuBar = screen.findByTestId('menu-bar')
        })

        expect(menuBar).resolves.toBeInTheDocument()
    })
})