import React from 'react'
import { render, renderWithRouter, screen } from '@tests/base'
import { EXAMPLE_LINK, EXAMPLE_TITLE } from '@tests/constants'
import { LinkListItem } from '@components/molecules'
import userEvent from '@testing-library/user-event'

describe('LinkListItem', () => {
    it('renders label with given value', () => {
        renderWithRouter(<LinkListItem label={EXAMPLE_TITLE} link={EXAMPLE_LINK} />)

        const label = screen.getByText(EXAMPLE_TITLE)

        expect(label).toBeInTheDocument()
    })

    it('handles a custom click event when passed through', async () => {
        const customClickHandler = jest.fn();

        renderWithRouter(<LinkListItem label={EXAMPLE_TITLE} handleLinkClick={customClickHandler} count={1} />)

        const button = await screen.findByRole('button')
        await userEvent.click(button)

        expect(customClickHandler).toBeCalled()
    })
})