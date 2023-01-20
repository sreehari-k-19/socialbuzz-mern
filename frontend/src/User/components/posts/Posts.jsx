import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostsData } from "../../Data/PostsData";
import { fetchPosts } from "../../redux/Slice/PostSlice";
import Post from "../post/Post";
import './posts.scss';

const Posts = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth.authData)
  const { posts, loading } = useSelector((state) => state.post)
  console.log("post user", user,loading,user._id)
  useEffect(() => {
    dispatch(fetchPosts(user._id))
  },[])

  return (
    <div className="Posts">
      {loading ? "fetching posts..." : posts?.map((post, id) => {
        return <Post data={post} id={id} />;
      })}
    </div>
  );
};

export default Posts;
