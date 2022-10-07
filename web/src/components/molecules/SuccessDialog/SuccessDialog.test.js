import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@tests/base'
import { SuccessDialog } from '@components/molecules'
import { EXAMPLE_TEXT, EXAMPLE_TITLE } from '@tests/constants'

describe('SuccessDialog', () => {
    it('renders when open prop is true', () => {
        render(<SuccessDialog open={true} />)

        const successDialog = screen.getByRole('dialog')

        expect(successDialog).toBeInTheDocument()
    })

    it('renders with default title', () => {
        render(<SuccessDialog open={true} />)

        const dialogTitle = screen.getByRole('heading')

        expect(dialogTitle).toBeInTheDocument()
    })

    it('renders with title prop when given', () => {
        render(<SuccessDialog open={true} title={EXAMPLE_TITLE} />)

        const dialogTitle = screen.getByText(EXAMPLE_TITLE)

        expect(dialogTitle).toBeInTheDocument()
    })

    it('renders with default dialog text', () => {
        render(<SuccessDialog open={true} />)

        const dialogText = screen.getByText('Well, that was successful.')

        expect(dialogText).toBeInTheDocument()
    })

    it('renders dialog text when given text prop', () => {
        render(<SuccessDialog open={true} text={EXAMPLE_TEXT} />)

        const dialogText = screen.getByText(EXAMPLE_TEXT)

        expect(dialogText).toBeInTheDocument()
    })

    it('renders done button which calls method passed in prop', async () => {
        const handleDone = jest.fn()
        render(<SuccessDialog open={true} handleDone={handleDone} />)

        const doneButton = screen.getByText('Done')

        await userEvent.click(doneButton)

        expect(handleDone).toBeCalled()
    })
})