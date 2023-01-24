import { InputBox } from '@components/atoms'
import { ConfirmationDialog } from '@components/molecules'
import { Box, Button, LinearProgress } from '@mui/material'
import { useSpaceContext } from '@providers/SpaceProvider'
import { useUserContext } from '@providers/UserProvider'
import { useSpaceService } from '@services/space-service'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CreateSpacePage = () => {
    const spaceService = useSpaceService()
    const { userId } = useUserContext()
    const navigate = useNavigate()
    const [spaceName, setSpaceName] = useState('')
    const [confirmCreate, setConfirmCreate] = useState(false)
    const [loading, setLoading] = useState(false)

    const createSpace = async () => {
        setConfirmCreate(false)
        setLoading(true)
        const space = await spaceService.create(spaceName)
        const localStorageObject = {
            activeSpace: space
        }

        localStorage.setItem(userId, JSON.stringify(localStorageObject))

        setLoading(false)
        navigate(`/`)
    }

    return (
        <Box sx={{
            padding: '2rem'
        }}>
            {!loading && (
                <>
                    <h1>Create Space</h1>
                    <InputBox label='Space Name' value={spaceName} handleValueChange={newValue => setSpaceName(newValue)} />
                    <Button onClick={() => setConfirmCreate(true)} sx={{
                        marginTop: '1rem'
                    }} variant='contained'>Create Space</Button>
                </>
            )}
            {loading && (
                <LinearProgress />
            )}

            <ConfirmationDialog open={confirmCreate} title='Confirm Create' text='Are you sure you want to create this space?' handleConfirm={createSpace} handleClose={() => setConfirmCreate(false)} />
        </Box>
    )
}