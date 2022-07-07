import React from "react";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "@providers/RouterProvider";
import { render, screen } from "@testing-library/react";
import { corporateTheme } from "../theme";

const CorporateProvider = ({ children }) => (
    <ThemeProvider theme={corporateTheme('light')}>
        <RouterProvider>
            {children}
        </RouterProvider>
    </ThemeProvider>
)

export const renderWithProviders = (ui, options) => render(ui, { wrapper: CorporateProvider, ...options })

export * from '@testing-library/react'

describe('@tests/base)', () => {
    it('runs smoothly', () => {
        renderWithProviders(<h1 data-testid="hello-world">Hello world</h1>);
        expect(screen.getByTestId('hello-world')).not.toBeNull();
    })
})