import React from 'react';
import { renderWithProviders, renderWithRouter, screen} from "@tests/base"
import userEvent from '@testing-library/user-event';
import { App } from "../src/App"

describe('App', () => {
    it('renders AppBar component with default title', () => {
        renderWithRouter(<App />)
        expect(screen.getByTestId('menu-bar')).toBeInTheDocument()
    })

    it('renders AppBar with title Team when path is / or /team', () => {
        renderWithRouter()
        expect(screen.getByTestId('menubar-title').innerHTML).toBe('Team')
    })
})