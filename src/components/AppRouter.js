import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {privateRoutes, publicRoutes} from "../routes";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import Chat from "./Chat";
import Login from "./Login";

const AppRouter = () => {
    const user = false;

    return (
        <Routes>
            {user
                ?
                publicRoutes.map(({path, element}) => (
                    <Route path={"/chat"} element={<Chat/>} key={path}/>
                )) :
                privateRoutes.map(({path, element}) => (
                    <Route path={"/login"} element={<Login/>} key={path}/>
                ))
            }
            <Route path="*" element={<Navigate to={user ? CHAT_ROUTE : LOGIN_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRouter;
