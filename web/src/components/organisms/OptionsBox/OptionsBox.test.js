import React, { Fragment } from 'react'
import { render, screen } from '@tests/base'
import { OptionsBox } from '@components/organisms'
import { EXAMPLE_TITLE } from '@tests/constants'

describe('OptionsBox', () => {
    it('renders a label with given value', () => {
        render(<OptionsBox label={EXAMPLE_TITLE} />)

        const label = screen.getByText(EXAMPLE_TITLE)

        expect(label).toBeInTheDocument()
    })

    it('renders a list of items', () => {
        const items = [
            <div>item one</div>,
            <div>item two</div>,
            <div>item three</div>
        ]

        render(<OptionsBox label={EXAMPLE_TITLE}>
            {items.map((item, index) => <Fragment key={index}>{item}</Fragment>)}
        </OptionsBox>)

        const list = screen.getByRole('list')

        expect(list.children.length).toBe(items.length)
    })
})