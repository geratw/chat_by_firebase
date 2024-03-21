import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import { LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth);

    return (
        <nav className="flex items-center justify-end p-6 ">
            <div>
                {user ? (
                        <button onClick={()=>{auth.signOut()}} className="p-2 border-red-500 border-2">Out</button>
                ) : (
                    <NavLink to={LOGIN_ROUTE}>
                        <button className="p-2 border-red-500 border-2">Login</button>
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
