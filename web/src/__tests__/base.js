import React from "react";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "@providers/RouterProvider";
import { render, screen } from "@testing-library/react";
import { corporateTheme } from "../theme";

const AllProviders = ({ children }) => (
    <ThemeProvider theme={corporateTheme('light')}>
        <RouterProvider>
            {children}
        </RouterProvider>
    </ThemeProvider>
)

const ThemeProviders = ({ children }) => (
    <ThemeProvider theme={corporateTheme('light')}>
        {children}
    </ThemeProvider>
)

const RouterProviders = ({ children }) => (
    <RouterProvider>
        {children}
    </RouterProvider>
)

export const renderWithProviders = (ui, options) => render(ui, { wrapper: AllProviders, ...options })
export const renderWithTheme = (ui, options) => render(ui, { wrapper: ThemeProviders, ...options })
export const renderWithRouter = (ui, options) => render(ui, { wrapper: RouterProviders, ...options })

export * from '@testing-library/react'

describe('@tests/base)', () => {
    it('runs smoothly', () => {
        render(<h1 data-testid="hello-world">Hello world</h1>);
        expect(screen.getByTestId('hello-world')).not.toBeNull();
    })
})