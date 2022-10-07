import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@tests/base'
import { ConfirmationDialog } from '@components/molecules'
import { EXAMPLE_TEXT, EXAMPLE_TITLE } from '@tests/constants'

describe('ConfirmationDialog', () => {
    it('renders when open prop is true', () => {
        render(<ConfirmationDialog open={true} />)

        const confirmationDialog = screen.getByRole('dialog')

        expect(confirmationDialog).toBeInTheDocument()
    })

    it('renders with default title', () => {
        render(<ConfirmationDialog open={true} />)

        const dialogTitle = screen.getByRole('heading')

        expect(dialogTitle).toBeInTheDocument()
    })

    it('renders with title prop when given', () => {
        render(<ConfirmationDialog open={true} title={EXAMPLE_TITLE} />)

        const dialogTitle = screen.getByText(EXAMPLE_TITLE)

        expect(dialogTitle).toBeInTheDocument()
    })

    it('renders with default dialog text', () => {
        render(<ConfirmationDialog open={true} />)

        const dialogText = screen.getByText('Are you sure you want to do this?')

        expect(dialogText).toBeInTheDocument()
    })

    it('renders dialog text when given text prop', () => {
        render(<ConfirmationDialog open={true} text={EXAMPLE_TEXT} />)

        const dialogText = screen.getByText(EXAMPLE_TEXT)

        expect(dialogText).toBeInTheDocument()
    })

    it('renders cancel button which calls method passed in prop', async () => {
        const handleClose = jest.fn()
        render(<ConfirmationDialog open={true} handleClose={handleClose} />)

        const cancelButton = screen.getByText('Cancel')

        await userEvent.click(cancelButton)

        expect(handleClose).toBeCalled()
    })

    it('renders confirm button which calls method passed in prop', async () => {
        const handleConfirm = jest.fn()
        render(<ConfirmationDialog open={true} handleConfirm={handleConfirm} />)

        const confirmButton = screen.getByText('Confirm')

        await userEvent.click(confirmButton)

        expect(handleConfirm).toBeCalled()
    })
})