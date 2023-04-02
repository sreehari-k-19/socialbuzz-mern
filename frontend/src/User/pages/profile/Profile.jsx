import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserprofile } from '../../api/requests';
import ErrorBoundary from '../../components/error/ErrorBoundary';

import PostSide from '../../components/postSide/PostSide';
import ProfieCard from '../../components/profileCard/ProfieCard';
import ProfieLeft from '../../components/profileLeft/ProfieLeft';
import RightSide from '../../components/rightside/RightSide';
import './profile.scss'

const Profile = () => {
  const { user } = useSelector((state) => state.auth.authData)
  const params = useParams();
  const [profileData, setProfileData] = useState({})
  const ProfileUserId = params.id;
  const [ownUser, setOwnuser] = useState(true)

  useEffect(() => {
    const fetchProfileuser = async () => {
      if (ProfileUserId === user._id) {
        setProfileData(user)
      } else {
        const { data } = await getUserprofile(ProfileUserId)
        setProfileData(data)
        setOwnuser(false)
      }
    }
    fetchProfileuser();
  }, [user, ProfileUserId])

  return (
    <div className="Profile">
      <ErrorBoundary>
        <ProfieLeft profileData={profileData} />
      </ErrorBoundary>
      <div className='Profile-center'>

        <ProfieCard location="profilePage" profileData={profileData} />

        <PostSide ownUser={ownUser} />
      </div>
      <RightSide />
    </div >
  )
}

export default Profile