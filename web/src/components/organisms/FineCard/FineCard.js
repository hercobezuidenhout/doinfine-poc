import { Box, Card, Typography, CardContent, Avatar } from "@mui/material";
import React from "react";
import { faker } from '@faker-js/faker';
import { ArrowRightAlt } from "@mui/icons-material";
const { useTheme } = require("@emotion/react")

const FineCard = (props) => {
    const theme = useTheme();

    return (
        <Card>
            <CardContent sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Avatar alt="Remy Sharp" src={faker.image.avatar()} />
                    <ArrowRightAlt sx={{
                        margin: `0px ${theme.spacing(1)}`
                    }} />
                    <Avatar alt="Remy Sharp" src={faker.image.avatar()} />
                </Box>
                <Box sx={{
                    marginLeft: theme.spacing(2)
                }}>
                    <Box>
                        <Typography variant="p">For showing up late to meeting</Typography>
                    </Box>
                    <Box>
                        <Typography variant="span" sx={{
                            fontSize: '10px'
                        }}>From Herco Bezuidenhout to Renier Pretorius</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}