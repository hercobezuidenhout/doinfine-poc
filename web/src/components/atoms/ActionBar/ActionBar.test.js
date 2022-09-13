import React from 'react'
import { render, renderWithRouter, screen } from '@tests/base'
import { ActionBar } from '@components/atoms'
import { BrowserRouter } from 'react-router-dom'

describe('ActionBar', () => {
    it('displays default title', () => {
        renderWithRouter(<ActionBar />)
        expect(screen.getByText("Doin' Fine 👌")).toBeInTheDocument()
    })

    it('displays given title', () => {
        const title = 'Fine Someone'
        renderWithRouter(<ActionBar title={title} />)
        expect(screen.getByText(title)).toBeInTheDocument()
    })

    it('renders cancel button when link is provided', () => {
        const link = '/somewhere'
        renderWithRouter(<ActionBar link={link} />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})