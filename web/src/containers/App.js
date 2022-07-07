import React, { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { BottomNavigationBar } from "@components/molecules";
import { Menu } from "@mui/icons-material";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { Team } from "@pages/Team";
import { Company } from "@pages/Company";

export const App = () => {

    const [toolbar, setToolbar] = useState(undefined);
    const [title, setTitle] = useState(undefined);



    const handleSetToolbar = (innerNavToolbar) => setToolbar(innerNavToolbar);

    const handleSetTitle = (title) => setTitle(title);

    return (
        <div>
            <AppBar elevation={0} sx={{
                backgroundColor: 'white',
                color: 'black',
            }}>
                <Toolbar sx={{
                    justifyContent: 'space-between'
                }}>
                    {title}
                    <Link to="/settings/account">
                        <Menu />
                    </Link>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="team" element={<Team setToolbar={handleSetToolbar} setTitle={handleSetTitle} />} />
                <Route path="company" element={<Company setToolbar={handleSetToolbar} setTitle={handleSetTitle} />} />
                <Route path="*" element={<Team setToolbar={handleSetToolbar} setTitle={handleSetTitle} />} />
            </Routes>
            
            <BottomNavigationBar innerToolbar={toolbar} />
        </div>
    )
}

