import styled from '@emotion/styled';
import { Chip, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, Outlet, useSearchParams } from 'react-router-dom';

const StyledChip = styled(Chip)({
    width: '100%',
    color: 'white',
    marginLeft: '1rem'
})

export const Add = ({ setToolbar, setTitle }) => {

    const InnerToolbar = () => (
        <Toolbar>
            <Link to="/add/fine"><StyledChip label="Fine Someone" /></Link>
            <Link to="/add/payment"><StyledChip label="Pay Fine" /></Link>
        </Toolbar>
    )

    const Title = () => (
        <Typography variant="h5">Add</Typography>
    )

    useEffect(() => {
        setToolbar(InnerToolbar)
        setTitle(Title)
    }, [])

    return (
        <Outlet />
    )
}