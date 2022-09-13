import { ActionBar, InfoBox } from '@components/atoms'
import { FineBox } from '@components/molecules'
import { Box, Button, CssBaseline, LinearProgress, Modal, Typography } from '@mui/material'
import { useTeamContext } from '@providers/TeamProvider'
import { useFineService } from '@services/fine-service'
import { useUserService } from '@services/user-service'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

let x;

export const FinePage = () => {
    const [username, setUsername] = useState()
    const [reason, setReason] = useState()
    const [open, setOpen] = useState(false)
    const [members, setMembers] = useState()
    const [loading, setLoading] = useState()
    const [successfulSubmit, setSuccessfulSubmit] = useState()
    const [counter, setCounter] = useState(5)

    const teamContext = useTeamContext()
    const fineService = useFineService()
    const navigate = useNavigate()

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const confirmFine = async () => {
        setOpen(false)
        setLoading(true)
        const user = members.filter(member => member.username == username.slice(1))[0]

        const fineRequest = {
            finee: user.id,
            reason: reason
        }

        console.log(fineRequest)

        const response = await fineService.submitFine(fineRequest)

        console.log(response)
        setLoading(false)

        if (response.status == 200) {
            setSuccessfulSubmit(true)

            x = setInterval(() => {
                setCounter(prev => prev - 1)
            }, 1000)
        }
    }

    const fetchUserDetails = () => {
        if (!username) return
        if (!members) return
        const user = members.filter(member => member.username == username.slice(1))[0]
        if (!user) return `No user found with username: ${username}`
        return `${user.firstName} ${user.lastName}`
    }

    const setLink = () => {
        if (teamContext) return `/team/${teamContext.id}`
    }

    useEffect(() => {
        if (!teamContext) return
        if (!teamContext.members) return
        if (members) return

        setMembers(teamContext.members)
    }, [teamContext])

    useEffect(() => {
        if (counter == 0) {
            clearInterval(x)
            navigate(`/team/${teamContext.id}`)
        }
    }, [counter])

    return (
        <div>
            {!loading && !successfulSubmit &&
                <>
                    <ActionBar title='Fine Someone' link={setLink()} />
                    <Box sx={{
                        padding: '1rem'
                    }}>
                        <FineBox setUsername={setUsername} setReason={setReason} />
                        <InfoBox title='HOW TO FINE'>
                            To fine someone, start by typing "Fine" and
                            then the username you want to fine. As
                            you start typing the username, you will see
                            suggestions pop up. Add a "for" and ...
                        </InfoBox>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            marginTop: '1rem'
                        }}>
                            <Button onClick={handleClick}>Submit</Button>
                        </Box>
                        {username && fetchUserDetails()}
                    </Box>
                </>
            }
            {
                loading && !successfulSubmit &&
                <>
                    <p>👀 Submitting fine ...</p>
                    <LinearProgress />
                </>
            }
            {
                !loading && successfulSubmit &&
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
                            <Typography variant="h1">📝✅</Typography>
                            <Typography>Fine request has been submitted!</Typography>
                            <Typography>Redirecting in {counter}</Typography>
                        </Box>
                    </Box>
                </>
            }


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '0.5rem',
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm Fine
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to fine {fetchUserDetails()} for {reason}?
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}>
                        <Button onClick={confirmFine}>Confirm</Button>
                    </Box>
                </Box>
            </Modal>
        </div >
    )
}