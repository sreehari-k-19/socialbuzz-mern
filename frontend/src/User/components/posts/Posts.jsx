import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPosts } from "../../redux/Slice/PostSlice";
import CircularLoading from "../circularLoading/CircularLoading";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth.authData);
  const { posts, loading, error } = useSelector((state) => state.post);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // useEffect(() => {
  //   return (() => {
  //     dispatch(fetchPosts({ id: authData.user._id, page }))
  //   });
  // }, [dispatch, authData.user._id, page]);

  // const handleLoadMore = () => {
  //   setPage((prev)=>prev+1);
  // };

  useEffect(() => {
    return (() => {
      fetchPost();
    });
  }, [user._id]);

  const fetchPost = () => {
    setPage(page + 1)
    dispatch(fetchPosts({ id: user._id, page })).then((response) => {
      if (response.payload.length === 0) {
        setHasMore(false);
      }
    })
  }


  let filteredPosts = posts;
  if (id) filteredPosts = posts.filter((post) => post.userId === id);
  if (!filteredPosts.length) return <div className='noposts'><h2>No posts, Share your posts</h2></div>
    return (
      <InfiniteScroll
        dataLength={filteredPosts.length}
        next={fetchPost}
        hasMore={hasMore}
        loader={<CircularLoading />}
      >
        <div className="Posts">
          {filteredPosts.map((post, index) => (
            <Post key={index} data={post} id={index} />
          ))}
        </div>
      </InfiniteScroll>
    );
};

export default Posts;
