import React, {useContext} from 'react';
import {Context} from  "../index"
import firebase from "firebase/compat/app";

const Login = () => {
    const {auth} = useContext(Context)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const user = await auth.signInWithPopup(provider)
        console.log(user)
    }

    return (
        <div className="flex items-center justify-center h-screen bg-[#263038]">
            <button onClick={login} className="p-2 border-red-500 border-2 text-yellow-50">
                Войти с помощью Google
            </button>
        </div>
    );
};

export default Login;
