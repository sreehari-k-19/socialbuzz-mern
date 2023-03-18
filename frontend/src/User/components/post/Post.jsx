import React, { useEffect, useRef, useState } from "react";
import { UilTimes } from "@iconscout/react-unicons";
import Swal from 'sweetalert2'
import Comment from "../../../img/comment.png";
import Share from "../../../img/share.png";
import Heart from "../../../img/Like.png";
import NotLike from "../../../img/notlike.png";

import "./post.scss";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../api/requests";
import { deletePost, editPost } from "../../redux/Slice/PostSlice";
import PostReport from "../postreport/PostReport";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.auth.authData)
  const dispatch = useDispatch()
  const textareaRef = useRef(null);
  console.log(data, "post dataa")
  const [desc, setDesc] = useState(data.desc)
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)
  const [modalOpened, setModalOpened] = useState(false)
  const [postEdit, setPostEdit] = useState(false)

  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }
  const [dropActive, setDropactive] = useState(false)

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
        dispatch(deletePost({ id: id, userId: user._id }))
      }
    })
  }

  console.log("modeell", modalOpened)
  useEffect(() => {

    if (postEdit) {
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [postEdit]);

  const handleChangepost = () => {
    console.log("<<<>>>>>>", desc)
    let postData = {
      userId: user._id,
      desc: desc
    }
    dispatch(editPost({ id: data._id, postData }))
  }

  return (
    <div className="Post">
      <div>
        <div>Hari k</div>

        <div className="dot" onClick={() => setDropactive(!dropActive)}>
          {/* {dropActive ? (
            <div className="dropdown">
              <div className="dropclose" onClick={dropDown}>
                <UilTimes />
              </div>
              {user._id === data.userId ? (
                <>
                  <div onClick={() => handleDelete(data._id)}>Delete</div>
                  <div onClick={() => setPostEdit(true)}>Edit</div>
                </>
              ) : (
                <div onClick={() => setModalOpened(true)}>Report</div>
                <PostReport modalOpened={modalOpened} setModalOpened={setModalOpened} id={data._id} />
              )}
              <PostReport modalOpened={modalOpened} setModalOpened={setModalOpened} id={data._id} />
            </div>
          ) : (
            <>
              <span></span>
              <span></span>
              <span></span>
            </>
          )} */}
          {dropActive ? (
            user._id === data.userId ? (<div className="dropdown">
              <div className="dropclose" onClick={() => setDropactive(!dropActive)}>
                <UilTimes />
              </div>
              <div onClick={() => handleDelete(data._id)}>Delete</div>
              <div onClick={() => setPostEdit(true)}>Edit</div>
            </div>) : (
              <div className="dropdown">
                <div className="dropclose" onClick={() => setDropactive(!dropActive)}>
                  <UilTimes />
                </div>
                <div style={{ height: '200px' }} onClick={() => {
                  console.log("modeell", modalOpened)
                  setModalOpened((modalOpened) => !modalOpened)
                  // setDropactive(!dropActive)
                }}>Report</div>
              </div>
            )
          ) : (
            <>
              <span></span>
              <span></span>
              <span></span>
            </>
          )}
          <PostReport modalOpened={modalOpened} setModalOpened={setModalOpened} id={data._id} />

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
        {postEdit ? <span> <textarea name="desc" ref={textareaRef} defaultValue={desc} onChange={(e) => setDesc(e.target.value)} />
          <button onClick={handleChangepost}>save changes</button> </span> : <span>{data.desc}</span>}
      </div>
    </div>
  );
};

export default Post;


