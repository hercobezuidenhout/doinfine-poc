import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from '../App';

export const RouterProvider = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}