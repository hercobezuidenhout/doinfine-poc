import React from "react";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "@providers/RouterProvider";
import { render, screen } from "@testing-library/react";
import { corporateTheme } from "../src/theme";

import '@testing-library/jest-dom'
import { AuthProvider, OuterAuthProvider } from "@providers/OuterAuthProvider";
import { BrowserRouter } from "react-router-dom";


const AllProviders = ({ children }) => (
    <ThemeProvider theme={corporateTheme('light')}>
        <BrowserRouter>
            <OuterAuthProvider>
                {children}
            </OuterAuthProvider>
        </BrowserRouter>
    </ThemeProvider>
)

const LightThemeProviders = ({ children }) => (
    <ThemeProvider theme={corporateTheme('light')}>
        {children}
    </ThemeProvider>
)

const DarkThemeProviders = ({ children }) => (
    <ThemeProvider theme={corporateTheme('dark')}>
        {children}
    </ThemeProvider>
)

const RouterProviders = ({ children }) => (
    <BrowserRouter>{children}</BrowserRouter>
)

export const renderWithProviders = (ui, options) => render(ui, { wrapper: AllProviders, ...options })
export const renderWithLightTheme = (ui, options) => render(ui, { wrapper: LightThemeProviders, ...options })
export const renderWithDarkTheme = (ui, options) => render(ui, { wrapper: DarkThemeProviders, ...options })
export const renderWithRouter = (ui, options) => render(ui, { wrapper: RouterProviders, ...options })

export * from '@testing-library/react'

describe('@tests/base)', () => {
    it('runs smoothly', () => {
        render(<h1 data-testid="hello-world">Hello world</h1>);
        expect(screen.getByTestId('hello-world')).not.toBeNull();
    })
})