import React, {useContext, useState} from 'react';
import Loader from "./Loader";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection, useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";

const Chat = () => {
    // const {auth, firestore} = useContext(Context)
    // const [user] = useAuthState(auth);
    // const [value, setValue] = useState('')
    // const [messages, loading] = useCollectionData(
    //     firestore.collation('messages').orderBy('createAt')
    // )
    //
    // const sendMessage = async () => {
    //     firestore.orderBy('messages').add ({
    //         uid:user.uid,
    //         displayName: user.displayName,
    //         photoURL: user.photoURL,
    //         text:value,
    //         createAt: firebase.firestore.FieldValue.serverTimestamp()
    //     })
    //     setValue('')
    // }
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('')
    const messagesRef = firestore.collection('messages');
    const messagesQuery = messagesRef.orderBy('createAt');
    const [messages, loading] = useCollectionData(messagesQuery);
    if (loading) {
        return <Loader/>
    }
    const sendMessage = async () => {
        const messageRef = messagesRef.doc();
        await messageRef.set({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        setValue('');
    };
    const uniqueUsers = messages.reduce((acc, message) => {
        if (!acc[message.displayName]) {
            acc[message.displayName] = message;
        }
        return acc;
    }, {});

// Преобразование объекта уникальных имен пользователей в массив
    const userList = Object.keys(uniqueUsers).map(name => uniqueUsers[name]);


    return (
        <div className="flex h-[94vh]">
            <div className="w-1/4 bg-gray-800 text-white p-6">
                <h1 className="text-2xl font-bold mb-6">Чат</h1>
                {userList?.map(user => (
                    <div className="space-y-4 mt-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gray-600"><img src={user.photoURL} alt=""/></div>
                            <div>
                                <p className="text-sm font-medium">{user.displayName}</p>
                            </div>
                        </div>

                    </div>))}
            </div>
            <div className="w-3/4 pl-6 pr-6 ">
                <div className="h-[95%] bg-gray-200 rounded-lg p-6 space-y-4">
                    {messages?.map(message =>
                        user.uid !== message.uid ?
                        <div
                            className={`flex items-center space-x-2 justify-start`}>

                            <div className="w-8 h-8 rounded-full bg-gray-600"><img src={message.photoURL} alt=""/></div>
                            <div className="w-1/2">
                                <div className="max-w-full">
                                    <p className="text-sm font-medium break-all">{message.displayName}</p>
                                    <p className="text-xs text-gray-400 break-words">{message.text}</p>
                                </div>
                            </div>
                        </div> :
                            <div
                                className={`flex items-center space-x-2 justify-end`}>
                                <div className="w-1/2">
                                    <div className="max-w-full">
                                        <p className="text-sm font-medium break-all text-end">{message.displayName}</p>
                                        <p className="text-xs text-gray-400 break-words text-end">{message.text}</p>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gray-600"><img src={message.photoURL} alt=""/></div>

                            </div>
                    )}
                </div>
                <div className="mt-6 flex items-center space-x-2">
                    <input type="text" className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
                           placeholder="Введите сообщение..." value={value} onChange={e => setValue(e.target.value)}/>
                    <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Отправить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
