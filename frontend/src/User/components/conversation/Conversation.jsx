import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import defaultProfile from '../../../img/defaultProfile.png'
import { getUserprofile } from '../../api/requests';
import './conversation.scss';

const Conversation = ({ data, currentUser,online }) => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState(null);

    useEffect(() => {

        const userId = data.members.find((id) => id !== currentUser)
        const getUserData = async () => {
            
            try {
                const { data } = await getUserprofile(userId)
                setUserData(data)
                // dispatch()
            }
            catch (error) {
                console.log(error)
            }
        }
        getUserData();
    }, [])
    return (
        <>
            <div className="follower conversation">
                <div>
                    {online && <div className="online-dot"></div>}
                    <img
                        src={userData?.profilePicture || defaultProfile}
                        alt="Profile"
                        className="followerImage"
                        style={{ width: "50px", height: "50px" }}
                    />
                    <div className="name">
                        <span >{userData?.firstname} {userData?.lastname}</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    )
}

export default Conversation