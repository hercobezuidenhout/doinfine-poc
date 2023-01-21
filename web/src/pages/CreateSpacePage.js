import { InputBox } from '@components/atoms'
import { ConfirmationDialog } from '@components/molecules'
import { Box, Button, LinearProgress } from '@mui/material'
import { useSpaceContext } from '@providers/SpaceProvider'
import React, { useState } from 'react'

export const CreateSpacePage = () => {
    const spaceContext = useSpaceContext()
    const [spaceName, setSpaceName] = useState('')
    const [confirmCreate, setConfirmCreate] = useState(false)
    const [loading, setLoading] = useState(false)

    const createSpace = async () => {
        setConfirmCreate(false)
        setLoading(true)
        await spaceContext.createSpace(spaceName)
        setLoading(false)
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