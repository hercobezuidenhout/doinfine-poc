import React from 'react'
import { render, renderWithProviders, screen } from '@tests/base'
import { DEFAULT_TITLE, EXAMPLE_TITLE } from '@tests/constants'
import { MenuBar } from '@components/molecules'
import userEvent from '@testing-library/user-event'

describe('MenuBar', () => {
    it('renders title correctly', () => {
        render(<MenuBar title={EXAMPLE_TITLE} />)
        expect(screen.getByTestId('menubar-title').innerHTML).toBe(EXAMPLE_TITLE)
    })

    it('renders a default title if no title is given', () => {
        render(<MenuBar />)
        expect(screen.getByTestId('menubar-title').innerHTML).toBe(DEFAULT_TITLE)
    })

    it('renders with MenuIcon', () => {
        render(<MenuBar />)
        expect(screen.getAllByTestId('menubar-icon')).not.toBeNull()
    })


    it('switches theme mode on click', () => {
        renderWithProviders(<MenuBar />)
        userEvent.click(screen.getByTestId('theme-switcher-light'))

        expect(screen.findByTestId('theme-switcher-dark')).resolves.toBeInTheDocument()
    })
})