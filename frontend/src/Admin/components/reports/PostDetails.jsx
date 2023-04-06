import React, { useState } from 'react'
import { Modal, useMantineTheme, ScrollArea } from "@mantine/core";
import { useDispatch} from "react-redux";
import { getPost } from '../../api/request';
import { useEffect } from 'react';
import Userposts from '../userposts/Userposts';
import { blockPost } from '../../slice/Adminslice';
const PostDetails = ({ postModal, setPostModal, post }) => {
    const [block, setBlock] = useState(post?.blocked)
    const dispatch =useDispatch()
    const theme = useMantineTheme();
    const customTitle = (
        <div className='userdetailsheader'>
          <div>
            <p style={{ fontSize: '17px', color: '#171717' }}> details</p>
          </div>
          <div>
            <button className={block?"button-unblock":"button-block"}  onClick={()=>{dispatch(blockPost(post._id));setBlock(!block)}}>{block ? "unblock" : "block"}</button></div>
        </div>
      );
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
                    title={customTitle}
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