import React, { useState } from "react";
import { UilTimes } from "@iconscout/react-unicons";
import Swal from 'sweetalert2'
import Comment from "../../../img/comment.png";
import Share from "../../../img/share.png";
import Heart from "../../../img/Like.png";
import NotLike from "../../../img/notlike.png";

import "./post.scss";
import { useDispatch, useSelector } from "react-redux";
import {likePost } from "../../api/requests";
import { deletePost } from "../../redux/Slice/PostSlice";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.auth.authData)
  const dispatch = useDispatch()
  console.log(data, "post dataa")
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)
  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }
  const [dropActive, setDropactive] = useState(false)
  const dropDown = () => {
    setDropactive(!dropActive)
  }
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
       dispatch( deletePost({id:id,userId:user._id}))
      }
    })
  }

  return (
    <div className="Post">
      <div>
        <div>Hari k</div>
        <div className="dot" onClick={dropDown}>
          {dropActive ? <div className="dropdown">
            <div className="dropclose" onClick={dropDown}><UilTimes /></div>
            <div>
              {user._id === data.userId ? <div onClick={() => handleDelete(data._id)}>Delete</div> : ""}
              <div>Report</div>
            </div>


          </div> : <><span></span><span></span><span></span></>}
        </div>
      </div>
      <img src={data.image} alt="" />
      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="" onClick={handleLike} />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span style={{ color: "$gray", fontSize: "12px" }}>{likes}Likes</span>
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
