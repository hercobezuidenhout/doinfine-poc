import styled from "@emotion/styled";
import { Box, Paper, Typography, Divider } from "@mui/material";
import React from "react";

const Span = styled(Typography)({
    fontSize: '10px',
    color: 'gray',
    textTransform: 'uppercase',
    fontWeight: 'bold'
})

export const FineCard = ({ fine }) => {
    const { value, reason, by, date } = fine;
    
    return (
        <Box>
            <Paper elevation={0} sx={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Typography data-testid="fine-value" role="heading" name="fine-value" variant="h4">{value}</Typography>
                <Box sx={{
                    width: '100%',
                    marginLeft: '1rem'
                }}>
                    <Typography variant="p">"{reason}"</Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '10px'
                    }}>
                        <Span variant="span">By {by}</Span>
                        <Span variant="span">{date || '07/07/22'}</Span>
                    </Box>
                </Box>
            </Paper>
            <Divider />
        </Box>
    )
}