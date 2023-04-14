import React, { useEffect, useRef, useState } from 'react'
import { addMessage, getMessages, getUserprofile } from '../../api/requests';
import defaultProfile from '../../../img/defaultProfile.png'
import { format } from "timeago.js"
import InputEmoji from "react-input-emoji";
import selectMessage from '../../../img/msgselect.svg';
import './chatbox.scss';

const ChatBox = ({ chat, currentUser, receivedMessage, setSendMessage }) => {

    const online = false;
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUserprofile(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id)
                setMessages(data)
                console.log("fetch msggg", data)

            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) fetchMessages();
    }, [chat])

    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])

    const scroll = useRef();
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    const handlesend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        const receiverId = chat.members.find((id) => id !== currentUser);
        // send message to socket server
        setSendMessage({ ...message, receiverId })
        try {
            const { data } = await addMessage(message)
            setMessages([...messages, data])
            setNewMessage(" ")
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            {chat ? (
                <div className='ChatBox-container chatbox'>
                    <>
                        <div className='chat-header'>
                            <div className='follower'>
                                <div>
                                    {/* {online && <div className="online-dot"></div>} */}
                                    <img
                                        src={userData?.profilePicture || defaultProfile}
                                        alt="Profile"
                                        className="followerImage"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <div className="name" style={{ fontSize: '0.8rem' }}>
                                        <span>{userData?.firstname} {userData?.lastname}</span>
                                        {/* <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span> */}
                                    </div>
                                </div>
                            </div>
                            <hr
                                style={{
                                    width: "95%",
                                    border: "0.1px solid #ececec",
                                    marginTop: "10px",
                                }}
                            />
                        </div>
                        <div className="chat-body">
                            {messages.map((message,index) => (
                                <>
                                    <div ref={scroll} key={index} className={message.senderId === currentUser ? "message own" : "message"}>
                                        <span>{message.text}</span>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div>

                        <div className='chat-sender'>
                            <div>+</div>
                            <InputEmoji value={newMessage} onChange={handleChange} />
                            <div className="send-button button" onClick={handlesend}>Send</div>
                        </div>
                    </>
                </div>
            ) : (
                <div className="chatbox-empty-message chatbox">
                
                        <img src={selectMessage} alt="" />
                        <span>Tap on a chat to start conversation...</span>
                </div>
            )}


        </>
    )
}

export default ChatBox