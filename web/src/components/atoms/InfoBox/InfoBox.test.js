import React from 'react'
import { render, screen } from '@tests/base'
import { InfoBox } from '@components/atoms'

describe('InfoBox', () => {
    it('renders title and children', () => {
        render(<InfoBox title='HOW TO FINE'>This is an example InfoBox</InfoBox>)

        expect(screen.getByRole('heading').innerHTML).toBe('HOW TO FINE')
        expect(screen.getByText('This is an example InfoBox')).toBeInTheDocument()
    })
})