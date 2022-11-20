import React from 'react'
import { render, renderWithProviders, renderWithRouter, screen } from '@tests/base'
import { DEFAULT_TITLE, EXAMPLE_TITLE } from '@tests/constants'
import { MenuBar } from '@components/molecules'
import userEvent from '@testing-library/user-event'

describe('MenuBar', () => {
    it('renders title correctly', () => {
        renderWithRouter(<MenuBar title={EXAMPLE_TITLE} />)
        expect(screen.getByTestId('menubar-title').innerHTML).toBe(EXAMPLE_TITLE)
    })

    it('renders a default title if no title is given', () => {
        renderWithRouter(<MenuBar />)
        expect(screen.getByTestId('menubar-title').innerHTML).toBe(DEFAULT_TITLE)
    })

    it('renders with MenuIcon', () => {
        renderWithRouter(<MenuBar />)
        expect(screen.getAllByTestId('menubar-icon')).not.toBeNull()
    })


    it('switches theme mode on click', () => {
        renderWithProviders(<MenuBar />)
        userEvent.click(screen.getByTestId('theme-switcher-light'))

        expect(screen.findByTestId('theme-switcher-dark')).resolves.toBeInTheDocument()
    })
})