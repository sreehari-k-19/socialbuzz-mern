import React, { useRef, useState } from "react";
import ProfileImage from "../../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../redux/Slice/PostSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "../../../img/defaultProfile.png";
import "./postShare.scss";

const PostShare = () => {

  const dispatch = useDispatch()
  // const loading = useSelector((state) => state.upload.uploading)
  const loading = false;
  const {user}  = useSelector((state) => state.auth.authData)
  console.log(user, "usrrrr post share")
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const descRef = useRef()

  const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      if (!validFileTypes.find(type => type === img.type)) {
        toast.error('Please only upload image!', {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setImage(img)
      }
    }
  };

  const reset = () => {
    setImage(null);
    descRef.current.value = ""
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: descRef.current.value
    }
 
    if (image) {
      const data = new FormData()
      const filename = Date.now() + image.name;
      data.append("userId", user._id)
      data.append("desc", descRef.current.value)
      data.append("name", filename)
      data.append("file", image)
      console.log("daata iamg", data)
      dispatch(uploadPost(data))
    }
    reset()
  }


  return (

    <div className="PostShare">
      <img src={user.profilePicture ? user.profilePicture : Profile} alt="" />

      <div>
        <input type="text" ref={descRef} required placeholder="What's Happening" />
        <div className="postOptions">
          <div className="option" style={{ color: "#4CB256" }} onClick={() => imageRef.current.click()}>
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "#4A4EB7" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "#EF5757" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "#E1AE4A" }}>
            <UilSchedule />
            Schedule
          </div>
          <button className="button ps-button" onClick={handleSubmit} disabled={loading}>{loading ? "Uploding.." : "Share"}</button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => { setImage(null) }} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
