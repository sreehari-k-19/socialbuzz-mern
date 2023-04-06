import React, { useEffect, useRef, useState } from 'react'
import { Modal, useMantineTheme, ScrollArea, Button } from "@mantine/core";
import { useSelector,useDispatch } from 'react-redux';
import { ActionIcon } from '@mantine/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from './Commentmodal.module.scss';
import Post from '../post/Post';
import InputEmoji from "react-input-emoji";
import { addComment, getComments } from '../../api/requests';
import defaultImage from '../../../img/defaultProfile.png'
import { deleteComment } from '../../redux/Slice/PostSlice';

const CommentModal = ({ commetModal, setCommentModal, post }) => {
    const theme = useMantineTheme();
    const { user } = useSelector((state) => state.auth.authData);
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([])
    const lastCommentRef = useRef(null);
    const handleChange = (newMessage) => {
        setNewComment(newMessage)
    }
    const customTitle = (
        <div style={{ fontSize: '24px', color: '#171717', textShadow: '1px 1px #000000' }}>
            {post.firstname} Post
        </div>
    );

    useEffect(() => {
        const fetchComments = async () => {
            const { data } = await getComments(post._id);
            return data;
        }
        fetchComments().then((data) => {
            setComments(data)
        })
    }, [])

    useEffect(() => {
        if (lastCommentRef.current) {
            lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [comments]);

    const handleSend = (e) => {
        e.preventDefault()
        let data = { userId: user._id, comment: newComment }
        addComment(post._id, data).then((res) => {
            setNewComment("")
            setComments((prevComments) => prevComments.concat(res.data));
        })
    }
    const deleteComm =(id,postId)=>{
        dispatch(deleteComment({id,postId})).then(()=>{
            setComments(prevComments => {
                return prevComments.filter(com => com.comments._id !== id);
              });
        })
    }
    return (
        <Modal
            overlayColor={
                theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
            size="xl"
            opened={commetModal}
            onClose={() => setCommentModal(false)}
            title={customTitle}
            transitionProps={{ transition: 'fade', duration: 200 }
            }
            className={styles.customModal}
        >
            <div style={{ maxHeight: '400px', overflow: 'auto', marginBottom: "50px" }}>
                <Post data={post} />
                {comments.length !== 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className={styles.commentsection} ref={comments.length - 1 === index ? lastCommentRef : null}>
                            <div className={styles.comments}>
                                <div>
                                    <div>
                                        <img src={defaultImage} alt="" />
                                    </div>
                                    <div>
                                        <div className={styles.username}>
                                            <span>{comment.firstname} {comment.lastname}</span>
                                            <span>{comment.username}</span>
                                        </div>
                                        <p>{comment.comments.comment}</p>
                                    </div>
                                </div>
                                {user._id === comment.comments.userId ? (
                                    <div className={styles.editbutton}>
                                        <Button.Group>
                                            <ActionIcon variant="light"><EditIcon size="1rem" /></ActionIcon>
                                            <ActionIcon variant="light" onClick={()=>deleteComm(comment.comments._id,post._id) } ><DeleteIcon size="1rem" /></ActionIcon>
                                        </Button.Group>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No comment, Add new</p>
                )}

            </div>
            <div style={{ position: 'fixed', bottom: 0, minWidth: '95%', backgroundColor: 'white' }}>
                <div className={styles.commentsender}>
                    <InputEmoji value={newComment} onChange={handleChange} />
                    <div className="button" style={{ width: "85px", height: "35px" }} onClick={handleSend} >add</div>
                </div>
            </div>

        </Modal >
    )
}

export default CommentModal;






