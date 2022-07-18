import React from 'react'
import { render, renderWithRouter, screen } from '@tests/base'
import { BottomNavigationBar } from '@components/molecules'

describe('BottomNavigationBar', () => {
    it('has three elements in total in primary bar', () => {
        render(<BottomNavigationBar />)
        const totalChildren = screen.getByTestId('primary-bar').children.length
        expect(totalChildren).toBe(3)
    })

    it('renders TeamFilterBar by default', () => {
        render(<BottomNavigationBar />)
        expect(screen.getByTestId('team-filter-bar')).toBeInTheDocument()
    })

    it('renders TeamFilterBar if url is /team', () => {
        renderWithRouter(<BottomNavigationBar />)
        
        expect(screen.getByTestId('team-filter-bar')).toBeInTheDocument()
    })
})