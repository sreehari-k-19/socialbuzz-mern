import React, { useEffect, useState } from "react";
import { UilPen } from "@iconscout/react-unicons";
import { useParams } from "react-router-dom";
import "./infoCard.scss";
import ProfileModal from "../profileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserprofile } from "../../api/requests";
import { LogOut } from "../../redux/Slice/AuthSlice";

const InfoCard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.authData);
  const params = useParams()
  const ProfileUserId = params.id;
  const [profileUser, setProfileuser] = useState({})
  const [modalOpened, setModalOpened] = useState(false)
  useEffect(() => {
    const fetchProfileuser = async () => {
      if (ProfileUserId === user._id) {
        setProfileuser(user)
      } else {
        const profileUser = await getUserprofile(ProfileUserId)
        setProfileuser(profileUser)

      }
    }
    fetchProfileuser()
  }, [user])

  const handleLogout = () => {
    dispatch(LogOut())
  }
  return (
    <div className="InfoCard">
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
        <span>  {profileUser.relationShip || "Not added"}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in</b>
        </span>
        <span>  {profileUser.livesin || "Not added"}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at</b>
        </span>
        <span>  {profileUser.worksAt || "Not added"}</span>
      </div>
      <button className="button logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};



export default InfoCard;
