import React from 'react';
import PostSide from '../../components/postSide/PostSide';
import ProfieCard from '../../components/profileCard/ProfieCard';
import ProfieLeft from '../../components/profileLeft/ProfieLeft';
import RightSide from '../../components/rightside/RightSide';
import './profile.scss'

const Profile = () => {
  return (
    <div className="Profile">
        <ProfieLeft/>
        <div className='Profile-center'>
            <ProfieCard/>
            <PostSide/>
        </div>
        <RightSide/>
    </div>
  )
}

export default Profile