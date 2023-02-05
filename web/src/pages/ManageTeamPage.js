import { ActionBar } from '@components/atoms'
import { ConfirmationDialog, EditDialog, MemberListItem, SuccessDialog } from '@components/molecules'
import { Box, Button, Container, Dialog, Slide, Snackbar } from '@mui/material'
import { useSpaceContext } from '@providers/SpaceProvider'
import { useUserContext } from '@providers/UserProvider'
import { useTeamService } from '@services/team-service'

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const ManageTeamPage = () => {
    const [originalTeam, setOriginalTeam] = useState()
    const [team, setTeam] = useState()
    const [hasChanges, setHasChanges] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [confirmSave, setConfirmSave] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { fetchById, update } = useTeamService()
    const { id } = useParams()

    const { userId } = useUserContext()
    const { userIsOwner: userIsSpaceOwner } = useSpaceContext()
    const navigate = useNavigate()

    const checkIfUserIsOwner = (roles) => {
        const value = roles.find(role => role.userId === userId && role.role === 'owner')

        return value !== undefined
    }

    const fetchTeam = async () => {
        const fetchTeamResponse = await fetchById(id)

        if (checkIfUserIsOwner(fetchTeamResponse.roles) || userIsSpaceOwner()) {
            console.log('owner', checkIfUserIsOwner(fetchTeamResponse.roles), userIsSpaceOwner())
            setTeam({ ...fetchTeamResponse })
            setOriginalTeam({ ...fetchTeamResponse })
        } else {
            console.log('not owner', checkIfUserIsOwner(fetchTeamResponse.roles), userIsSpaceOwner())
        }
    }

    const handleRoleChange = ({ userId, newRole }) => {
        let updatedTeam = team
        updatedTeam.roles = updatedTeam.roles.map(role => role.userId === userId ? ({ ...role, role: newRole }) : role)
        setTeam(updatedTeam)
        setHasChanges(JSON.stringify(originalTeam) !== JSON.stringify(updatedTeam))
    }

    const handleRemove = (userId) => {
        console.log('Remove user ' + userId)
        let updatedTeam = team
        updatedTeam.members = updatedTeam.members.filter(member => member.id !== userId)
        updatedTeam.roles = updatedTeam.roles.filter(role => role.userId !== userId)

        console.log(updatedTeam)
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

        const response = await update(teamToUpdate)
        console.log(response)
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
                {team.members.map((member, index) => member && (
                    <MemberListItem
                        key={index}
                        member={member}
                        memberRole={team.roles.find(role => role.userId === member.id)}
                        handleRoleChange={handleRoleChange}
                        handleRemoveClick={() => handleRemove(member.id)}
                    />
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