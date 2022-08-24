import React from 'react'
import { render, screen } from '@tests/base'
import { CompanyFilterBar } from '@components/molecules'

describe('CompanyFilterBar', () => {
    it('renders with two children', () => {
        render(<CompanyFilterBar />)
        const totalChildren = screen.getByTestId('company-filter-bar').children.length
        expect(totalChildren).toBe(2)
    })

    it('renders a component titled Fines', () => {
        render(<CompanyFilterBar />)
        expect(screen.getByText('Users')).toBeInTheDocument()
    })

    it('renders a component titled Teams', () => {
        render(<CompanyFilterBar />)
        expect(screen.getByText('Teams')).toBeInTheDocument()
    })
})