import React from 'react'
import { render, renderWithRouter, screen } from '@tests/base'
import { EXAMPLE_LINK, EXAMPLE_TITLE } from '@tests/constants'
import { LinkListItem } from '@components/molecules'

describe('LinkListItem', () => {
    it('renders label with given value', () => {
        renderWithRouter(<LinkListItem label={EXAMPLE_TITLE} link={EXAMPLE_LINK} />)

        const label = screen.getByText(EXAMPLE_TITLE)
        const link = screen.getByRole('link')
        const button = screen.getByRole('button')

        expect(label).toBeInTheDocument()
        expect(button).toBeInTheDocument()
        expect(link.attributes.getNamedItem('href').value).toBe(EXAMPLE_LINK)
    })
})