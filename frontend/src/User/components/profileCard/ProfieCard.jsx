import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultCover from "../../../img/defaultCover.jpg";
import Profile from "../../../img/defaultProfile.png";
import "./profileCard.scss";
import UpdateUserImages from "../userImageupdate/UpdateUserImages";

const ProfieCard = ({ location ,profileData}) => {
  const { user } = useSelector((state) => state.auth.authData)
  const { posts } = useSelector((state) => state.post)
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [cover, setCover] = useState(false)


  const handleCoverchange = (e) => {
    setCover(true)
    handleChange(e);
  }
  const handleProfileChange = (e) => {
    setCover(false)
    handleChange(e);
  }
  const handleChange=(e)=>{
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setShowModal(true)
    }
  }

  return (
    <div className={`ProfileCard ${location === "profilePage" ? 'primary-classname' : 'homeProfileCard'}`} >
      <div className="ProfileImages">
        <label htmlFor="coverPic" style={{ width: "100%" }}>
          <img src={profileData?.coverPicture ? profileData?.coverPicture : defaultCover} alt="" title="Click to change cover" id='coverPicture' className="coverPicture" />
        </label>
        {user._id ===profileData._id?<input type="file" id="coverPic" onChange={handleCoverchange} />:null }
        <label htmlFor="profilePic" style={{ position: 'absolute', bottom: '-3rem' }}>
          <img src={profileData?.profilePicture ? profileData?.profilePicture : Profile} alt="" id="profilePicture" className="profilePicture" />
        </label>
        {user._id ===profileData._id ? <input type="file" id="profilePic" onChange={handleProfileChange} />:null }
        {showModal ?<UpdateUserImages showModal={showModal} setShowModal={setShowModal} image={image} cover={cover} /> : ""}
      </div>
      <div className="ProfileName">
        <span>{profileData?.firstname} {profileData.lastname}</span>
        <span>{profileData?.worksAt || null}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{profileData?.following?.length||0}</span>
            <span>following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{profileData?.followers?.length || 0}</span>
            <span>Followers</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl">

              </div>
              <div className="follow">
                <span>{posts.filter((post) => post.userId === profileData._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${profileData._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfieCard;


