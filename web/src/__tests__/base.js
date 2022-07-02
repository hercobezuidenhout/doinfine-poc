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

const customRender = (ui, options) => render(ui, { wrapper: CorporateProvider, ...options })

export * from '@testing-library/react'

export { customRender as render }

test('Base works :)', () => {
    customRender(<h1 data-testid="hello-world">Hello world</h1>);
    expect(screen.getByTestId('hello-world')).not.toBeNull();
})