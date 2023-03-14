import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostsData } from "../../Data/PostsData";
import { fetchPosts } from "../../redux/Slice/PostSlice";
import CircularLoading from "../circularLoading/CircularLoading";
import Post from "../post/Post";
import './posts.scss';

const Posts = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { user } = useSelector((state) => state.auth.authData)
  let { posts, loading } = useSelector((state) => state.post)
  useEffect(() => {
    return (() => dispatch(fetchPosts(user._id)))
  }, [])
  console.log(posts,"poststs")
  if (!posts) return "no Posts";
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">
      {loading ? <CircularLoading /> : posts?.map((post, id) => {
        return <Post data={post} id={id} />;
      })}
    </div>
  );
};

export default Posts;
