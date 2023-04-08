import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Home from "../../../img/home.png";
import Noti from "../../../img/noti.png";
import Comment from "../../../img/comment.png";
import { Link } from "react-router-dom";
import { io } from 'socket.io-client';
import { UilSetting } from "@iconscout/react-unicons";
import { userChats } from '../../api/requests';
import Conversation from '../../components/conversation/Conversation';
import SearchBar from "../../components/searchbar/SearchBar";
import ChatBox from '../../components/chatBox/ChatBox';
import './chat.scss'

const Chat = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth.authData)
    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const socket = useRef();

    useEffect(() => {
        socket.current = io('https://socket.socialbuzz.fun');
        socket.current.emit('new-user-add', user._id)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users)
        })
    }, [user])

    //send msg to socket

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    // recive msg to socket

    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            console.log(data)
            setReceivedMessage(data);
        }

        );
    }, []);

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id);
                setChats(data);
                console.log("chat data", data, user._id)
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [user._id]);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };

    return (
        <div className="Chat">
            {/* Left Side */}
            <div className="Left-side-chat">
                <SearchBar />
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat,index) => (
                            <div key={index}
                                onClick={() => {
                                    setCurrentChat(chat);
                                }}
                            >
                                <Conversation
                                    data={chat}
                                    
                                    currentUser={user._id}
                                    online={checkOnlineStatus(chat)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}

            <div className="Right-side-chat">
                <div style={{ width: "20rem", alignSelf: "flex-end" }}>
                    <div className="navIcons">
                        <Link to="../home">
                            <img src={Home} alt="" />
                        </Link>
                        <UilSetting />
                        <img src={Noti} alt="" />
                        <Link to="../chat">
                            <img src={Comment} alt="" />
                        </Link>
                    </div>
                </div>
                <ChatBox
                    chat={currentChat}
                    currentUser={user._id}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                />
            </div>
        </div>
    )
}

export default Chat;