import { useTheme } from "@emotion/react";
import { Box, Card, Paper, Typography, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

export const TabPanel = (props) => {
    const { children, value, index, id, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={id}
        aria-labelledby={`simple-tabpanel-${index}`}
        {...other}>
            {value === index && (
                <Box sx={{ padding: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    )
}

export const Dashboard = (props) => {
    const theme = useTheme();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => setValue(newValue)

    return (
        <Paper sx={{
            padding: '1rem'
        }} elevation={0}>
            <Typography variant="h1">Greetings, User</Typography>
            <Paper sx={{
                margin: '1rem 0',
                display: 'flex',
                width: '100%'
            }} elevation={0}>
                <Card sx={{
                    width: '100%',
                    padding: theme.spacing(2),
                    marginRight: '10px'
                }}>
                    <Typography sx={{
                        fontWeight: 'bold',
                        color: theme.palette.secondary.dark,
                        textTransform: 'uppercase'
                    }} variant="p">Total Company Fines</Typography>
                    <Typography variant="h4">13</Typography>
                </Card>
                <Card sx={{
                    width: '100%',
                    padding: theme.spacing(2),
                    marginLeft: '10px'
                }}>
                    <Typography sx={{
                        fontWeight: 'bold',
                        color: theme.palette.secondary.dark,
                        textTransform: 'uppercase'
                    }} variant="p">Total Team Fines</Typography>
                    <Typography variant="h4">13</Typography>
                </Card>
            </Paper>
            <Typography sx={{
                margin: '1rem 0'
            }} variant="h2">Leaderboard</Typography>
            

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                    <Tab label="Fines" id='fines' />
                    <Tab label="Payments" id='payments' />
                </Tabs>
            </Box>
            <TabPanel value={value} id='fines' index={0}>
                Fines tab
            </TabPanel>
            <TabPanel value={value} id='payments' index={1}>
                Payments tab
            </TabPanel>
        </Paper>
    )
}