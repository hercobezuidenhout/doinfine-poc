import { useTheme } from "@emotion/react";
import { faker } from "@faker-js/faker";
import { Avatar, Box, Button, List, ListItemAvatar, ListItemButton, ListItemText, Modal, TextField, Typography } from "@mui/material";
import { TRUE } from "node-sass";
import React, { useState } from "react";

const users = [
    '@billy.anderson',
    '@billy.stevenson',
    '@billy.greatmore',
    '@bill.handle',
    '@john.anderson',
    '@andrew.stevenson',
    '@steve.walkman'
]

export const Fine = (props) => {
    const theme = useTheme();
    const [reason, setReason] = useState('')
    const [who, setWho] = useState('')
    const [what, setWhat] = useState('')

    const updateUsername = (user) => {
        const breakdown = reason.split('@')
        const usernameSection = breakdown[1]
        let usernameSectionSplit = []
        if (usernameSection.length > 1) {
            usernameSectionSplit = usernameSection.split(' ')
            usernameSectionSplit[0] = user
            console.log(usernameSectionSplit)
        }
        const groupedAgain = [
            breakdown[0],
            ...usernameSectionSplit
        ]

        let newReason = '';

        groupedAgain.forEach(value => newReason += value.trim() + ' ')
        setReason(newReason)
    }

    const handleReasonChange = (event) => {
        const target = event.target.value
        setReason(event.target.value)

        if (target.includes('@')) {
            let username = target.split('@')[1];
            if (username.split(' ').length > 1) {
                username = username.split(' ')[0]
            }
            setWho(username)
        }

        // Fine @someone for [reason]
        const breakdown = target.split('for');
        if (breakdown.length !== 2) return;
        const who = breakdown[0].split(' ')[1].substring(1, breakdown[0].split(' ')[1].length);
        const what = breakdown[1].substring(1, breakdown[1].length);

        setWho(who);
        setWhat(what);
    }

    return (
        <Box sx={{
            marginTop: '70px',
            width: '100%'
        }}>
            <TextField value={reason} onChange={handleReasonChange} multiline rows={4} fullWidth label="Fine @someone for ..." />
            <Box sx={{
                padding: '0.5rem',
                marginTop: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main
            }}>
                <Box>
                    <Typography sx={{
                        fontWeight: 'bold'
                    }} variant="caption">HOW TO FINE SOMEONE</Typography>
                </Box>
                <Typography variant="p">
                    Start fining someone by typing "Fine @someone for [reason]".
                    As soon as you type @, you will be presented with a list of team members
                    who you can fine. The reason for the fine will be whatever comes after the
                    "for".
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'end'
            }}>
                <Button>Submit</Button>
            </Box>

            {who &&
                <Box>
                    <Typography sx={{
                        fontWeight: 'bold'
                    }} variant="caption">AVAILABLE TEAM MEMBERS</Typography>

                    <List dense>
                        {users.filter(user => user.includes(who)).map(user => (
                            <ListItemButton key={user} onClick={() => updateUsername(user)}>
                                <ListItemAvatar>
                                    <Avatar src={faker.image.avatar()} />
                                </ListItemAvatar>
                                <ListItemText primary={user} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            }
        </Box>
    )
}