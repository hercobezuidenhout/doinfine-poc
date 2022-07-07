import { useTheme } from "@emotion/react";
import { ArrowRight, Check, Close } from "@mui/icons-material";
import { AppBar, Box, List, ListItem, Paper, Toolbar, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CorporateContext } from "../../src/theme";

export const Account = () => {
    const theme = useTheme();
    const { mode, setMode } = useContext(CorporateContext);

    return (
        <Box>
            <AppBar elevation={0} sx={{
                backgroundColor: 'white',
                color: 'black',
                position: 'relative'
            }}>
                <Toolbar sx={{
                    justifyContent: 'space-between'
                }}>
                    <Link to="/">
                        <Close />
                    </Link>
                    <Typography variant="h5">Settings</Typography>
                    <Link to="/">
                        <Check />
                    </Link>
                </Toolbar>
            </AppBar>
            <Box>
                <Typography variant="h6">Account</Typography>
                <Paper square elevation={0} sx={{
                    backgroundColor: theme.palette.secondary.main
                }}>
                    <List>
                        <ListItem sx={{
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="p">billy@example.com</Typography>
                            <ArrowRight />
                        </ListItem>
                    </List>
                </Paper>
            </Box>
            <Box sx={{
                marginTop: '1rem'
            }}>
                <Typography variant="h6">Theme</Typography>
                <Paper square elevation={0} sx={{
                    backgroundColor: grey[200]
                }}>
                    <List>
                        <ListItem sx={{
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="p">Light</Typography>
                            <ArrowRight onClick={() => mode == 'light' ? setMode('dark') : setMode('light')} />
                        </ListItem>
                    </List>
                </Paper>
            </Box>
        </Box>
    )
}