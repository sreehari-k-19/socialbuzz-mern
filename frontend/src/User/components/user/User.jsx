import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultCover from "../../../img/defaultCover.jpg";
import Profile from "../../../img/defaultProfile.png";
import { followUser, unFollowUser } from '../../redux/Slice/AuthSlice';


const User = ({ person }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth.authData)
  const [following, setFollowing] = useState(person.followers.includes(user._id));
  const handleFollow = () => {
    following?dispatch(unFollowUser({_id: person._id, user})):
    dispatch(followUser({_id: person._id, user}))
    setFollowing((prev)=>!prev);
  }
  return (
    <div className="follower" >
      <div>
        <img src={person.profilePicture || Profile} alt="" className='followerImage' onClick={()=>navigate(`/profile/${person._id}`)} />
        <div className="name" onClick={()=>navigate(`/profile/${person._id}`)}>
          <span>{person.firstname}</span>
          <span>@ {person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  )
}

export default User;