import { ActionBar } from '@components/atoms'
import { ConfirmationDialog, EditDialog, MemberListItem, SuccessDialog } from '@components/molecules'
import { Box, Button, Container, Dialog, FormControl, InputLabel, MenuItem, Select, Slide, Snackbar } from '@mui/material'
import { useTeamService } from '@services/team-service'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ManageTeamPage = () => {
    const [originalTeam, setOriginalTeam] = useState()
    const [team, setTeam] = useState()
    const [hasChanges, setHasChanges] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [confirmSave, setConfirmSave] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { fetchById, update } = useTeamService()
    const { id } = useParams()

    const fetchTeam = async () => {
        const fetchTeamResponse = await fetchById(id)
        setTeam({ ...fetchTeamResponse })
        setOriginalTeam({ ...fetchTeamResponse })
    }

    const handleRoleChange = ({ userId, newRole }) => {
        let updatedTeam = team
        updatedTeam.roles = updatedTeam.roles.map(role => role.userId === userId ? ({ ...role, role: newRole }) : role)
        setTeam(updatedTeam)
        setHasChanges(JSON.stringify(originalTeam) !== JSON.stringify(updatedTeam))
    }

    const handleTeamNameChange = (newName) => {
        setIsEdit(false)

        let updatedTeam = team
        updatedTeam.name = newName

        setTeam(updatedTeam)
        setHasChanges(JSON.stringify(originalTeam) !== JSON.stringify(updatedTeam))
    }

    const saveChanges = async () => {
        let teamToUpdate = { ...team }

        setOriginalTeam({ ...team })

        teamToUpdate.members = team.members.map(member => member.id)

        await update(teamToUpdate)

        setHasChanges(false)
        setConfirmSave(false)
        setIsSuccess(true)
    }

    useEffect(() => {
        fetchTeam()
    }, [id])

    return (
        <div>
            <ActionBar title='Manage Team' link={-1} />
            {team && <Container>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1>{team.name}</h1>
                    <Button onClick={() => setIsEdit(true)} variant='outlined'>Edit Name</Button>
                </Box>
                {team.members.map((member, index) => (
                    <MemberListItem key={index} member={member} memberRole={team.roles.find(role => role.userId === member.id)} handleRoleChange={handleRoleChange} />
                ))}
            </Container>
            }
            <Snackbar TransitionComponent={(props) => <Slide {...props} direction='up' />} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={hasChanges} message='There are unsaved changes' action={
                <Button onClick={() => {
                    setConfirmSave(true)
                    setHasChanges(false)
                }}>Save</Button>
            } />
            <EditDialog
                open={isEdit}
                title='Edit Team Name'
                description='Enter the new name for the team'
                inputLabel='Team Name'
                handleValueChange={handleTeamNameChange}
                handleClose={() => setIsEdit(false)}
            />
            <ConfirmationDialog
                open={confirmSave}
                handleClose={() => {
                    setConfirmSave(false)
                    setHasChanges(JSON.stringify(originalTeam) !== JSON.stringify(team))
                }}
                handleConfirm={saveChanges}
                title='Confirm Changes'
                text='Are you sure you want to save the changes to this team?'
            />
            <SuccessDialog open={isSuccess} handleDone={() => setIsSuccess(false)} />
        </div>
    )
}