import React from 'react'
import { render, screen } from '@tests/base'
import { DEFAULT_TITLE, EXAMPLE_TITLE } from '@tests/constants'
import { MenuBar } from '@components/molecules'

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
})