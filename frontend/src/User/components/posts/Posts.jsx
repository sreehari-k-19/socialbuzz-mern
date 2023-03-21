import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostsData } from "../../Data/PostsData";
import { fetchPosts } from "../../redux/Slice/PostSlice";
import CircularLoading from "../circularLoading/CircularLoading";
import Post from "../post/Post";
import './posts.scss';

const Posts = () => {
  const dispatch = useDispatch()
  const params = useParams()
  let [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useSelector((state) => state.auth.authData)
  let { posts, loading } = useSelector((state) => state.post)
  
  // if (posts) setData(posts);

  useEffect(() => {
    return (() => dispatch(fetchPosts({ id: user._id, page })))
  }, [])

  const fetchNextPage = () => {
    setPage(page + 1)
    dispatch(fetchPosts({ id: user._id, page })).then((response) => {
      if (response.payload.length === 0) {
        setHasMore(false);
      }
      setData([...data, ...response.payload])
    })

  }

  if (!data) return "no Posts";
  if (params.id) data = data.filter((post) => post.userId === params.id)
  return (
    <InfiniteScroll dataLength={data.length} next={fetchNextPage} hasMore={hasMore} loader={<CircularLoading />}>
      <div className="Posts">
        { data?.map((post, id) => {
          return <Post data={post} id={id} />;
        })}
      </div>
    </InfiniteScroll>
  );
};

export default Posts;
