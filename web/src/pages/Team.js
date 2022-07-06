import { Avatar, Box, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { faker } from '@faker-js/faker';
import styled from '@emotion/styled';
import { FineCard } from "@components/organisms";
import { useSearchParams } from "react-router-dom";

const StyledAvatar = styled(Avatar)({
    marginRight: '10px'
})

const ActiveAvatar = styled(StyledAvatar)({
    border: '3px solid black'
})

const team = [
    {
        id: 1,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        image: faker.image.avatar(),
        fines: [
            { id: 1, reason: faker.lorem.sentence(5), by: `${faker.name.firstName()} ${faker.name.lastName()}`, value: 2 },
            { id: 2, reason: faker.lorem.sentence(5), by: `${faker.name.firstName()} ${faker.name.lastName()}`, value: 3 },
            { id: 3, reason: faker.lorem.sentence(5), by: `${faker.name.firstName()} ${faker.name.lastName()}`, value: 6 }
        ]
    },
    {
        id: 2,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        image: faker.image.avatar(),
        fines: [
            { id: 5, reason: faker.lorem.sentence(5), by: `${faker.name.firstName()} ${faker.name.lastName()}`, value: 1 },
            { id: 6, reason: faker.lorem.sentence(5), by: `${faker.name.firstName()} ${faker.name.lastName()}`, value: 2 },
            { id: 7, reason: faker.lorem.sentence(5), by: `${faker.name.firstName()} ${faker.name.lastName()}`, value: 4 },
            { id: 8, reason: faker.lorem.sentence(5), by: `${faker.name.firstName()} ${faker.name.lastName()}`, value: 1 },
        ]
    },
    {
        id: 3,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        image: faker.image.avatar(),
        fines: [
            { id: 9, reason: faker.lorem.sentence(5), by: `${faker.name.firstName()} ${faker.name.lastName()}`, value: 2 }
        ]
    },
]

export const Team = ({ setToolbar, setTitle }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedMember, setSelectedMember] = useState(searchParams.get('member'));

    const handleMemberClick = (member) => {
        setSearchParams({
            member: member
        })
        setSelectedMember(member)
    }

    const InnerToolbar = () => (
        <Toolbar>
            {team.map(member => (selectedMember == member.name ? <ActiveAvatar key={member.id} src={member.image} /> : <StyledAvatar key={member.id} onClick={() => handleMemberClick(member.name)} src={member.image} />))}
        </Toolbar>
    )

    const Title = () => (
        <Typography variant="h5">Team</Typography>
    )

    const showCurrentMembersFines = () => {
        const currentMember = team.find(member => member.name == selectedMember)
        if (!currentMember) return

        const fines = currentMember.fines
        
        return fines.map(fine => <FineCard fine={fine} />)
    }

    useEffect(() => {
        handleMemberClick(team[0].name)
    }, [])

    useEffect(() => {
        setToolbar(InnerToolbar)
        setTitle(Title)
    }, [selectedMember])


    return (
        <Box sx={{
            marginTop: '48px',
            padding: '1rem',
        }}>
            <Typography variant="h3">{selectedMember}</Typography>
            <Box>
                {showCurrentMembersFines()}
            </Box>
        </Box>
    )
}