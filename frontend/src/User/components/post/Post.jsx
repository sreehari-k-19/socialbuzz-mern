import React, { useState } from "react";
import Comment from "../../../img/comment.png";
import Share from "../../../img/share.png";
import Heart from "../../../img/Like.png";
import NotLike from "../../../img/notlike.png";
import "./post.scss";
import { useSelector } from "react-redux";
import { likePost } from "../../api/requests";

const Post = ({ data }) => {
  const {user}=useSelector((state)=>state.auth.authData)
  console.log(data,"post dataa")
  const [liked,setLiked]=useState(data.likes.includes(user._id))
  const [likes,setLikes] = useState(data.likes.length)
  const handleLike=()=>{
    setLiked((prev)=>!prev)
    likePost(data._id,user._id)
    liked?setLikes((prev)=>prev-1):setLikes((prev)=>prev+1)

  }
  return (
    <div className="Post">
      <img src={data.image} alt="" />
      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="" onClick={handleLike} />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span style={{color:"$gray",fontSize:"12px"}}>{likes}Likes</span>
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
