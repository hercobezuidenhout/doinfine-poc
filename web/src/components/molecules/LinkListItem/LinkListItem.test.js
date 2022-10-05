import React from 'react'
import { render, renderWithRouter, screen } from '@tests/base'
import { EXAMPLE_LINK, EXAMPLE_TITLE } from '@tests/constants'
import { LinkListItem } from '@components/molecules'
import userEvent from '@testing-library/user-event'

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

    it('renders with badge if count value is passed in', () => {
        renderWithRouter(<LinkListItem label={EXAMPLE_TITLE} link={EXAMPLE_LINK} count={1} />)

        const badge = screen.getByTestId('count-badge')

        expect(badge).toBeInTheDocument()
    })

    it('handles a custom click event when passed through', async () => {
        const customClickHandler = jest.fn();

        renderWithRouter(<LinkListItem label={EXAMPLE_TITLE} handleLinkClick={customClickHandler} count={1} />)

        const button = await screen.findByRole('button')
        await userEvent.click(button)

        expect(customClickHandler).toBeCalled()
    })
})