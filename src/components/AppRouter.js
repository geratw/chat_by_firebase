import React, {useContext} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {privateRoutes, publicRoutes} from "../routes";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import Loader from "./Loader";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth);
    console.log(user)
    return (
        <Routes>
            {user
                ?
                privateRoutes.map(({path, element}) => (
                    <Route path={path} element={element} key={path}/>
                ))

                :
                publicRoutes.map(({path, element}) => (
                    <Route path={path} element={element} key={path}/>
                ))
            }
            <Route path="*" element={<Navigate to={user ? CHAT_ROUTE : LOGIN_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRouter;
