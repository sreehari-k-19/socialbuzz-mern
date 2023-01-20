import React from "react";
import Comment from "../../../img/comment.png";
import Share from "../../../img/share.png";
import Heart from "../../../img/Like.png";
import NotLike from "../../../img/notlike.png";
import "./post.scss";
const Post = ({ data }) => {
  console.log("post detailsss",data.image)
  return (
    <div className="Post">
      <img src={data.image} alt="" />
      <div className="postReact">
        <img src={data.liked ? Heart : NotLike} alt="" />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span style={{color:"$gray",fontSize:"12px"}}>{data.likes}Likes</span>
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
