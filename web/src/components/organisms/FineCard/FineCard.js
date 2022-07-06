import styled from "@emotion/styled";
import { Box, Paper, Typography, Divider } from "@mui/material";
import React from "react";
const { useTheme } = require("@emotion/react")

const Span = styled(Typography)({
    fontSize: '10px',
    color: 'gray',
    textTransform: 'uppercase',
    fontWeight: 'bold'
})

export const FineCard = (props) => {
    const theme = useTheme();

    return (
        <Box>
            <Paper elevation={0} sx={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Typography variant="h4">2</Typography>
                <Box sx={{
                    width: '100%',
                    marginLeft: '1rem'
                }}>
                    <Typography variant="p">"For showing up late to a meeting"</Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '10px'
                    }}>
                        <Span variant="span">By Andrew Stevenson</Span>
                        <Span variant="span">05/06/22</Span>
                    </Box>
                </Box>
            </Paper>
            <Divider />
        </Box>
    )
}