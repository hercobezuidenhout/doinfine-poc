import React, { useEffect, useState } from "react";
import './App.css';
import { Typography, Avatar, AvatarGroup, Card, CardContent, Divider, Paper, BottomNavigation, BottomNavigationAction, createTheme, ThemeProvider } from "@mui/material";
import { faker } from '@faker-js/faker';
import { AccountCircle, AddCard, ArrowRightAlt, Business, Group, Mode, Money } from "@mui/icons-material";
import { corporateTheme } from "./theme";

const App = () => {
    const [mode, setMode] = useState('light');

    return <ThemeProvider theme={corporateTheme(mode)}>
        <div>
            <Paper elevation={0} sx={{
                padding: '1rem',
                width: {
                    xs: '100%',
                    md: '50%'
                },
                margin: 'auto'
            }}>
                <div>
                    <Typography variant="h5">{faker.name.jobArea()}</Typography>
                    <AvatarGroup max={4} sx={{
                        justifyContent: 'start'
                    }}>
                        <Avatar alt="Remy Sharp" src={faker.image.avatar()} />
                        <Avatar alt="Travis Howard" src={faker.image.avatar()} />
                        <Avatar alt="Cindy Baker" src={faker.image.avatar()} />
                        <Avatar alt="Agnes Walker" src={faker.image.avatar()} />
                        <Avatar alt="Trevor Henderson" src={faker.image.avatar()} />
                    </AvatarGroup>
                </div>
                <div>
                    <Card sx={{
                        marginTop: '1rem'
                    }}>
                        <CardContent sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Typography variant="h3">13</Typography>
                            <Typography sx={{
                                marginLeft: '1rem'
                            }} variant="p">Total Fines</Typography>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Typography sx={{
                        marginTop: '1rem'
                    }} variant="h4">Recent Fines</Typography>
                    <Card sx={{
                        padding: '1rem',
                        display: 'flex'
                    }}>
                        <Paper sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }} elevation={0}>
                            <Avatar sx={{
                                marginRight: '0.8rem'
                            }} alt="Cindy Baker" src={faker.image.avatar()} />
                            <ArrowRightAlt />
                            <Avatar sx={{
                                marginLeft: '0.8rem'
                            }} alt="Cindy Baker" src={faker.image.avatar()} />
                        </Paper>

                        <Paper elevation={0} sx={{
                            marginLeft: '1rem'
                        }}>
                            <div>
                                <Typography variant="p">For showing up late to work</Typography>
                            </div>
                            <div>
                                <Typography sx={{
                                    color: 'gray',
                                    fontSize: '10px'
                                }} variant="span">24 June 2022</Typography>
                            </div>
                        </Paper>
                    </Card>
                </div>
            </Paper>


            <div>
                <BottomNavigation sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0
                }} showLabels>
                    <BottomNavigationAction onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} label='Team' icon={<Group />} />
                    <BottomNavigationAction label='Company' icon={<Business />} />
                    <BottomNavigationAction label='Fine' icon={<Money />} />
                    <BottomNavigationAction label='Pay Fine' icon={<AddCard />} />
                    <BottomNavigationAction label='Account' icon={<AccountCircle />} />
                </BottomNavigation>
            </div>
        </div>
    </ThemeProvider>
}

export default App;

