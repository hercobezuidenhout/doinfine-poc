import { useTheme } from "@emotion/react";
import { faker } from "@faker-js/faker";
import { Avatar, Box, Button, List, ListItemAvatar, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
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

    const handleReasonChange = (event) => {
        const reason = event.target.value
        setReason(event.target.value)

        if (reason.includes('@')) {
            let username = reason.split('@')[1];
            if (username.split(' ').length > 1) {
                username = username.split(' ')[0]
            }
            setWho(username)
        }

        // Fine @someone for [reason]
        const breakdown = reason.split('for');
        if (breakdown.length !== 2) return;
        const who = breakdown[0].split(' ')[1].substring(1, breakdown[0].split(' ')[1].length);
        const what = breakdown[1].substring(1, breakdown[1].length);

        setWho(who);

        console.log(users.filter(user => user.includes(who)))
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
                            <ListItemButton key={user}>
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