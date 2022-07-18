import React from 'react'
import { render, screen } from '@tests/base'
import { TeamFilterBar } from '@components/molecules'

describe('TeamFilterBar', () => {
    it('renders with no children', () => {
        render(<TeamFilterBar />)
        const totalChildren = screen.getByTestId('team-filter-bar').children.length
        expect(totalChildren).toBe(0)
    })
})