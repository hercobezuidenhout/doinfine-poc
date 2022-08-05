import React from 'react'
import { render, screen } from '@tests/base'
import { EXAMPLE_FINE } from '@tests/constants'
import { FineCard } from '@components/atoms'
import '@testing-library/jest-dom'

describe('FineCard', () => {
    it('renders given text', () => {
        render(<FineCard reason={EXAMPLE_FINE} />)
        expect(screen.getByText(EXAMPLE_FINE)).toBeInTheDocument()
    })
})