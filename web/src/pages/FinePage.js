import { ActionBar } from '@components/atoms'
import { Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { useTeamContext } from '@providers/TeamProvider'
import { useFineService } from '@services/fine-service'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const FinePage = () => {
    const [finee, setFinee] = useState('')
    const [reason, setReason] = useState()
    const [open, setOpen] = useState(false)
    const [members, setMembers] = useState()
    const [loading, setLoading] = useState()
    const [successfulSubmit, setSuccessfulSubmit] = useState()
    const [counter, setCounter] = useState(5)

    const teamContext = useTeamContext()
    const fineService = useFineService()

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSelectChange = (event) => {
        const value = event.target.value
        setFinee(value)
    }

    const handleTextFieldChange = (event) => {
        const value = event.target.value
        setReason(value)
    }

    const confirmFine = async () => {
        setOpen(false)
        setLoading(true)

        const user = members.filter(member => member.id == finee)[0]

        const fineRequest = {
            finee: user.id,
            reason: reason
        }

        const response = await fineService.submitFine(fineRequest)

        setLoading(false)

        if (response.status == 200) {
            setSuccessfulSubmit(true)
        }
    }

    const fetchUserDetails = () => {
        if (!finee) return
        if (!members) return
        const user = members.filter(member => member.id == finee)[0]
        return `${user.fullName}`
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

    return (
        <div>
            {!loading && !successfulSubmit &&
                <>
                    <ActionBar title='Fine Someone' link={setLink()} />
                    <Box sx={{
                        padding: '1rem'
                    }}>
                        <Typography variant='h6'>Who</Typography>
                        <FormControl sx={{
                            width: '100%'
                        }}>
                            <InputLabel id="who-label">Pick a user</InputLabel>
                            <Select
                                labelId="who-label"
                                label="Someone"
                                value={finee}
                                onChange={handleSelectChange}>
                                {members && members.map((member, index) => (
                                    <MenuItem key={index} value={member.id}>{member.fullName}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>

                        <Typography variant='h6'>For</Typography>
                        <TextField sx={{
                            width: '100%'
                        }} rows={4} multiline={true} onChange={handleTextFieldChange}></TextField>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            marginTop: '1rem'
                        }}>
                            <Button onClick={handleClick}>Submit</Button>
                        </Box>
                    </Box>
                </>
            }
            {
                loading && !successfulSubmit &&
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
                            <p>👀 Submitting fine ...</p>
                            <LinearProgress />
                        </Box>
                    </Box>
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
                            <Link to='/team'><Button>Back Home</Button></Link>
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