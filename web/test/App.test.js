import React from 'react';
import { renderWithRouter, screen} from "@tests/base"
import { App } from "../src/App"

describe('App', () => {
    it('renders AppBar component with default title', () => {
        renderWithRouter(<App />)

        expect(screen.getByTestId('menu-bar')).toBeInTheDocument()
    })
})