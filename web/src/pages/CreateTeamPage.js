import { InputBox } from '@components/atoms'
import { ConfirmationDialog } from '@components/molecules'
import { Box, Button, LinearProgress } from '@mui/material'
import { useSpaceContext } from '@providers/SpaceProvider'
import { useUserContext } from '@providers/UserProvider'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const CreateTeamPage = () => {
    const spaceContext = useSpaceContext()
    const userContext = useUserContext()
    const navigate = useNavigate()
    const { spaceId } = useParams()
    const [teamName, setTeamName] = useState('')
    const [confirmCreate, setConfirmCreate] = useState(false)
    const [loading, setLoading] = useState(false)

    const createTeam = async () => {
        setConfirmCreate(false)
        setLoading(true)
        const team = await spaceContext.createTeam(teamName)

        setLoading(false)

        if (!team) {
            alert('Failed creating team. Please try again.')
            return
        }

        navigate('/')
    }

    return (
        <Box sx={{
            padding: '2rem'
        }}>
            {!loading && (
                <>
                    <h1>Create Team</h1>
                    <InputBox label='Team Name' value={teamName} handleValueChange={newValue => setTeamName(newValue)} />
                    <Button onClick={() => setConfirmCreate(true)} sx={{
                        marginTop: '1rem'
                    }} variant='contained'>Create Team</Button>
                </>
            )}
            {loading && (
                <LinearProgress />
            )}

            <ConfirmationDialog open={confirmCreate} title='Confirm Create' text='Are you sure you want to create this team?' handleConfirm={createTeam} handleClose={() => setConfirmCreate(false)} />
        </Box>
    )
}