import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {privateRoutes, publicRoutes} from "../routes";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const AppRouter = () => {
    const user = false;

    return (
        <Routes>
            {user
                ? privateRoutes.map(({path, element: Element}) => (
                    <Route path={path} element={<Element />} key={path} />
                ))
                : publicRoutes.map(({path, element: Element}) => (
                    <Route path={path} element={<Element />} key={path} />
                ))
            }
            <Route path="*" element={<Navigate to={user ? CHAT_ROUTE : LOGIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
