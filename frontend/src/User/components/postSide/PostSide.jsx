import React from "react";
import Posts from "../posts/Posts";
import PostShare from "../postShare/PostShare";
import "./postSide.scss";

const PostSide = ({ ownUser }) => {
  return (
    <div className="postSide">
       {ownUser ?<PostShare />: null}
      <Posts /> 
    </div>
  );
};

export default PostSide;
