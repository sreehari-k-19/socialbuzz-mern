import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultCover from "../../../img/defaultCover.jpg";
import Profile from "../../../img/defaultProfile.png";
import { Modal, useMantineTheme } from "@mantine/core";
import "./profileCard.scss";

const ProfieCard = ({ location }) => {
  const { user } = useSelector((state) => state.auth.authData)
  console.log(user, "prrr userrr")
  const theme = useMantineTheme();
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
    <div className="ProfileCard">
      <div className="ProfileImages">
        <label htmlFor="coverPic" style={{ width: "100%" }}>
          <img src={user.coverPicture ? user.coverPicture : defaultCover} alt="" title="Click to change cover" id='coverPicture' className="coverPicture" />
        </label>
        <input type="file" id="coverPic" onChange={handleCoverchange} />
        <label htmlFor="profilePic" style={{ position: 'absolute', bottom: '-3rem' }}>
          <img src={user.profilePicture ? user.coverPicture : Profile} alt="" id="profilePicture" className="profilePicture" />
        </label>
        <input type="file" id="profilePic" onChange={handleProfileChange} />
        {showModal ? profilePicture(showModal, setShowModal, theme, image, cover) : ""}
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt || null}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl">

              </div>
              <div className="follow">
                <span>{posts.filter((post) => post.userId === user._id).length}</span>
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
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfieCard;

function profilePicture(showModal, setShowModal, theme, image, cover) {
  return (
    <Modal overlayColor={
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[2]
    }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={showModal}
      onClose={() => setShowModal(false)}>
      <div className="changeImage">
        <h1>hello</h1>
        <img src={URL.createObjectURL(image)} alt="" />
        {cover ? <button>cover</button> : <button>profile</button>}
      </div>
    </Modal>
  )
}
