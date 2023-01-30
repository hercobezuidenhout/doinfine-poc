import { ActionBar } from '@components/atoms'
import { SuccessDialog } from '@components/molecules'
import { Box, Button, Modal, Typography } from '@mui/material'
import { useFineRequestService } from '@services/fine-request-service'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export const FineRequestPage = () => {
    const { id } = useParams()
    const fineRequestService = useFineRequestService()
    const navigate = useNavigate()

    const [notFound, setNotFound] = useState()
    const [fineRequest, setFineRequest] = useState()
    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const fetchFineRequest = async () => {
        if (!id) return

        const request = await fineRequestService.fetchById(id).catch(error => {
            if (error.response.status == 404) setNotFound(true)
            return
        })

        if (!request) return

        setFineRequest(request)
    }

    const approveFineRequest = async () => {
        fineRequestService.update({
            requestId: fineRequest.id,
            approved: true
        })
            .then(response => {
                navigate('/')
            })
            .catch(error => {
                setIsOpenDialog(true)
            })
    }

    const declineFineRequest = async () => {
        const response = await fineRequestService.update({
            requestId: fineRequest.id,
            approved: false
        })

        navigate('/')
    }

    const handleDialogClose = () => {
        setIsOpenDialog(false)
        navigate('/')
    }

    useEffect(() => {
        fetchFineRequest()
    }, [id])

    return (
        <Box>
            <ActionBar title='Fine Request' link='/team' />
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: '60vh',
                justifyContent: 'space-around',
                textAlign: 'center'
            }}>
                {fineRequest && (
                    <Box sx={{
                        width: '60%',
                    }}>
                        <Typography variant='h2'>{fineRequest.finer} wants to fine <b>{fineRequest.finee}</b> for <b>{fineRequest.reason}</b>.</Typography>
                        <Box sx={{
                            marginTop: '2rem'
                        }}>
                            <Button variant='outlined' sx={{
                                marginRight: '1rem'
                            }} onClick={() => declineFineRequest()} >Reject</Button>
                            <Button variant='contained' onClick={() => approveFineRequest()}>Approve</Button>
                        </Box>
                    </Box>
                )}
                {notFound && (
                    <Box sx={{
                        width: '30%',
                        margin: 'auto',
                        marginTop: '2rem'
                    }}>
                        <Typography sx={{
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }} variant='h2'>Request Not Found</Typography>
                        <Typography sx={{
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                            You have either already responded to the fine request or you are the finer or finee.
                        </Typography>
                        <Link to='/team'>
                            <Button>Back Home</Button>
                        </Link>
                    </Box>
                )}
            </Box>
            <SuccessDialog open={isOpenDialog} handleDone={() => handleDialogClose()} title='Oops!' text='You have either already responded to the request or the request has been approved/rejected.' />
        </Box >
    )
}