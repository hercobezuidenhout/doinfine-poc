import { ActionBar } from '@components/atoms'
import { ConfirmationDialog, SuccessDialog } from '@components/molecules'
import { Box, Button, Typography } from '@mui/material'
import { usePaymentRequestService } from '@services/payment-request-service'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export const PaymentRequestPage = () => {
    const { id } = useParams()
    const paymentRequestService = usePaymentRequestService()

    const navigate = useNavigate()

    const [notFound, setNotFound] = useState()
    const [paymentRequest, setPaymentRequest] = useState()
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
    const [successDialogOpen, setSuccessDialogOpen] = useState(false)
    const [approve, setApproved] = useState(false)

    const fetchPaymentRequest = async () => {
        if (!id) return

        const request = await paymentRequestService.fetchById(id).catch(error => {
            if (error.response.status == 404) setNotFound(true)
            return
        })

        if (!request) return
        setPaymentRequest(request)
    }

    const handleConfirm = async () => {
        const response = await paymentRequestService.update({
            requestId: paymentRequest.id,
            approved: approve
        })

        setConfirmationDialogOpen(false)
        setSuccessDialogOpen(true)
    }

    const approvePaymentRequest = async () => {
        setApproved(true)
        setConfirmationDialogOpen(true)
    }

    const declinePaymentRequest = async () => {
        setApproved(false)
        setConfirmationDialogOpen(true)
    }

    useEffect(() => {
        fetchPaymentRequest()
    }, [id])

    return (
        <Box>
            <ActionBar title='Payment Request' link={-1} />
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: '60vh',
                justifyContent: 'space-around',
                textAlign: 'center'
            }}>
                {paymentRequest && (
                    <Box sx={{
                        width: '60%',
                    }}>
                        <Typography variant='h2'>{paymentRequest.fullName} claims that he has made a payment by {paymentRequest.action} on {dayjs(paymentRequest.dateOfPayment).format('D MMMM YYYY')}.</Typography>
                        <Box sx={{
                            marginTop: '2rem'
                        }}>
                            <Button variant='outlined' sx={{
                                marginRight: '1rem'
                            }} onClick={() => declinePaymentRequest()} >Reject</Button>
                            <Button variant='contained' onClick={() => approvePaymentRequest()}>Approve</Button>
                        </Box>
                    </Box>
                )}
                {notFound && (
                    <Box sx={{
                        textAlign: 'center',
                        width: '50%',
                        margin: 'auto',
                        marginTop: '2rem'
                    }}>
                        <Typography sx={{
                            marginBottom: '2rem'
                        }}>It seems like the request does not exist or you have already responded to it.</Typography>
                        <Link to='/team'>
                            <Button>Back Home</Button>
                        </Link>
                    </Box>
                )}
            </Box>
            <ConfirmationDialog
                open={confirmationDialogOpen}
                title="Confirm Response"
                text={`Are you sure you want to ${approve ? 'approve' : 'reject'} this payment request?`}
                handleClose={() => setConfirmationDialogOpen(false)}
                handleConfirm={handleConfirm} />

            <SuccessDialog
                open={successDialogOpen}
                title={`Payment Request ${approve ? 'Approved' : 'Rejected'}!`}
                handleDone={() => {
                    setSuccessDialogOpen(false)
                    navigate('/')
                }} />
        </Box >
    )
}