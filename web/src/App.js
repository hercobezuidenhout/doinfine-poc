import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import { Box, ThemeProvider } from "@mui/material";
import { Dashboard, Team, Company, Account, Fine, Payment } from '@pages';
import { BottomNavigationBar } from "@components/molecules";
import { corporateTheme } from "./theme";

const App = () => {
    const [mode, setMode] = useState('dark');
    const [theme, setTheme] = useState(corporateTheme(mode));

    useEffect(() => {
        setTheme(corporateTheme(mode));
    }, [mode])

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                height: '100vh'
            }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/company" element={<Company />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/fine" element={<Fine />} />
                        <Route path="/payment" element={<Payment />} />
                    </Routes>
                    <BottomNavigationBar />
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    )
}

export default App;

