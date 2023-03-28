import React, { useEffect, useState } from "react";
import { UilPen } from "@iconscout/react-unicons";
import { useParams } from "react-router-dom";
import "./infoCard.scss";
import ProfileModal from "../profileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { followUser, LogOut, unFollowUser } from "../../redux/Slice/AuthSlice";

const InfoCard = ({profileData}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.authData);
  const params = useParams()
  const ProfileUserId = params.id;
  const [modalOpened, setModalOpened] = useState(false)
  const [following, setFollowing] = useState(profileData?.followers?.includes(toString(user?._id)));

  console.log("userrrr", profileData)
 
  console.log("userrrr ffffffff", following)
  const handleFollow = () => {
    following ? dispatch(unFollowUser({ _id: profileData._id, user })) :
      dispatch(followUser({ _id: profileData._id, user }))
    setFollowing((prev) => !prev);
  }

  const handleLogout = () => {
    dispatch(LogOut())
  }

  return (
    <div className="InfoCard" style={{ position: "fixed", top: "80px" }}>
      <div className="infoHead">
        <h4>Profile info</h4>
        {user._id === ProfileUserId ? (
          <div>
            <UilPen width='2rem' height='1.2rem' onClick={() => {
              setModalOpened(true)
            }} />
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
          </div>
        ) : ("")}

      </div>
      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span>  {profileData.relationShip || "Not added"}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in</b>
        </span>
        <span>  {profileData.livesin || "Not added"}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at</b>
        </span>
        <span>  {profileData.worksAt || "Not added"}</span>
      </div>
      {user._id === ProfileUserId ? (
        <button className="button logout-button" onClick={handleLogout}>Logout</button>
      ) : (
        <button
          className={
            following ? "button fc-button UnfollowButton logout-button" : "button fc-button logout-button"
          }
          onClick={handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      )}

    </div>
  );
};



export default InfoCard;
