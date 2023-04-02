import React, { useState } from 'react'
import { Modal, useMantineTheme, ScrollArea } from "@mantine/core";
import { useQuery } from 'react-query';
import { getPost } from '../../api/request';
import { useEffect } from 'react';
import Userposts from '../userposts/Userposts';
const PostDetails = ({ postModal, setPostModal, postId }) => {
    const [post, setPost] = useState({})
    const theme = useMantineTheme();

    useEffect(() => {
        const getPostInfo = async () => {
            const { data } = await getPost(postId);
            console.log("...;;.;;;.;",data)
            setPost(data)
        }
        getPostInfo()
    }, [])
    console.log("p11p1p1p1",post)
    return (
        <>
            {
                <Modal
                    overlayColor={
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[9]
                            : theme.colors.gray[2]
                    }
                    overlayOpacity={0.55}
                    overlayBlur={3}
                    size="xl"
                    opened={postModal}
                    onClose={() => setPostModal(false)}
                >
                    <>
                        <Userposts data={post} />
                    </>
                </Modal>
            }

        </>
    )
}

export default PostDetails