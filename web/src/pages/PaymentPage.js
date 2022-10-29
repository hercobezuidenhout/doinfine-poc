import { ActionBar, InfoBox } from '@components/atoms'
import { Box, Button, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useTeamContext } from '@providers/TeamProvider'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import { usePaymentRequestService } from '@services/payment-request-service'
import { ConfirmationDialog, SuccessDialog } from '@components/molecules'
import { useNavigate } from 'react-router-dom'

const DATE_FORMAT = 'DD/MM/YYYY'

export const PaymentPage = () => {
    const teamContext = useTeamContext()
    const paymentRequestService = usePaymentRequestService();
    const navigate = useNavigate()

    const [dateOfPayment, setDateOfPayment] = useState(dayjs().format(DATE_FORMAT))
    const [paymentMethod, setPaymentMethod] = useState('')
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
    const [successDialogOpen, setSuccessDialogOpen] = useState(false)
    const [loading, setLoading] = useState()

    const handleDateOfPaymentChange = (newDate) => {
        setDateOfPayment(newDate)
    }

    const handlePaymentMethodChange = (event) => {
        const value = event.target.value
        setPaymentMethod(value)
    }

    const confirmSubmit = async () => {
        if (!teamContext) return
        setLoading(true)

        const paymentRequest = {
            teamId: teamContext.id,
            dateOfPayment: dayjs(dateOfPayment).format(DATE_FORMAT),
            action: paymentMethod
        }

        const response = await paymentRequestService.submitPaymentRequest(paymentRequest)
        if (!response) return

        setLoading(false)
        setConfirmationDialogOpen(false)
        setSuccessDialogOpen(true)
    }

    const handleSubmit = async () => {
        setConfirmationDialogOpen(true)
    }

    return (
        <div>
            {!loading &&
                <>

                    <ActionBar title="Log Payment" link={-1} />
                    <Box sx={{
                        padding: '1rem'
                    }}>
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="h6">When was this payment made</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        inputFormat="MM/DD/YYYY"
                                        value={dateOfPayment}
                                        onChange={handleDateOfPaymentChange}
                                        renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>

                            <Box>
                                <Typography variant="h6">How did you pay</Typography>
                                <TextField sx={{
                                    width: '100%'
                                }} rows={4} multiline={true} onChange={handlePaymentMethodChange}></TextField>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                marginTop: '1rem'
                            }}>
                                <Button disabled={paymentMethod.length < 1 || paymentMethod.includes('for')} onClick={handleSubmit}>Submit</Button>
                            </Box>
                            <InfoBox title="How to fine">
                                To submit a payment, choose the date on which you made the payment then write out the payment in
                                continuous tense so that it reads <i>Someone claims to have made a payment by [<b>doing something</b>] ...</i>.
                                <br />
                                <b>Note: The "by" is already inserted for you.</b>
                            </InfoBox>
                        </Stack>
                    </Box>
                    <ConfirmationDialog
                        open={confirmationDialogOpen}
                        title="Confirm Payment"
                        text="Are you sure you want to submit this payment request?"
                        handleClose={() => setConfirmationDialogOpen(false)}
                        handleConfirm={confirmSubmit} />

                    <SuccessDialog
                        open={successDialogOpen}
                        title="Payment Request Submitted!"
                        handleDone={() => {
                            setSuccessDialogOpen(false)
                            navigate('/')
                        }} />
                </>
            }
            {loading &&
                <>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        height: '100vh'
                    }}>
                        <Box sx={{
                            textAlign: 'center'
                        }}>
                            <p>👀 Submitting payment ...</p>
                            <LinearProgress />
                        </Box>
                    </Box>
                </>
            }
        </div>
    )
}