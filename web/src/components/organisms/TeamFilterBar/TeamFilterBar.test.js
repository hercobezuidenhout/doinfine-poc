import React from 'react'
import { renderWithRouter, screen } from '@tests/base'
import { TeamFilterBar } from '@components/organisms'
import { act } from 'react-test-renderer'

describe('TeamFilterBar', () => {
    it('renders with no children', () => {
        act(() => {
            renderWithRouter(<TeamFilterBar />)
        })

        const totalChildren = screen.getByTestId('team-filter-bar').children.length
        expect(totalChildren).toBe(3)
    })
})