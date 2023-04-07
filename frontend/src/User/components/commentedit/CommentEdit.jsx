import React, { useState } from 'react'
import { Modal, useMantineTheme, ScrollArea, Button } from "@mantine/core";

const CommentEdit = ({ editcomment, commentEdit, setCommentEdit }) => {
    const [newComment, setNewComment] = useState(editcomment.com.comments.comment)
    const theme = useMantineTheme();
    const updateComment=()=>{
        
    }
    return (
        <>
            <Modal
                overlayColor={
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2]
                }
                overlayOpacity={0.55}
                overlayBlur={3}
                size="xs"
                opened={commentEdit}
                onClose={() => setCommentEdit(false)}
                transitionProps={{ transition: 'fade', duration: 200 }
                }
                centered
            >
                <label for="comment-input">edit comment</label>
                <input style={{width:"200px"}} type="text" defaultValue={newComment} id="comment-input" onChange={(e) => setNewComment(e.target.value)} name='comment' />
                <button onClick={updateComment}>update</button>
            </Modal>
        </>
    )
}

export default CommentEdit