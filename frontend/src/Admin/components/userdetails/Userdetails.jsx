import React, { useEffect, useState } from 'react'
import { Modal, useMantineTheme, ScrollArea } from "@mantine/core";
import { useDispatch} from "react-redux";
import { getPosts } from '../../api/request';
import profile from '../../../img/profileImg.jpg'
import './userdetails.scss';
import Userposts from '../userposts/Userposts';
import { blockUser } from '../../slice/Adminslice';

const Userdetails = ({ user, modal, setModal }) => {
  const theme = useMantineTheme();
  const [posts, setPosts] = useState([])
  const [block, setBlock] = useState(user?.adminblocked)
  const dispatch = useDispatch()
  useEffect(() => {
    const getpost = async () => {
      const { data } = await getPosts(user._id)
      setPosts(data)
    }
    return (() => getpost())
  }, [])
  const customTitle = (
    <div className='userdetailsheader'>
      <div>
        <p style={{ fontSize: '17px', color: '#171717' }}>{user.username} details</p>
      </div>
      <div>
        <button className={block?"button-unblock":"button-block"} onClick={() =>{ dispatch(blockUser((user._id)));setBlock(!block)}}>{block ? "unblock" : "block"}</button></div>
    </div>
  );
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
        size="80%"
        opened={modal}
        onClose={() => setModal(false)}
        scrollAreaComponent={ScrollArea.Autosize}
        title={customTitle}
        transitionProps={{ transition: 'fade', duration: 200 }
        }
      >
        <ScrollArea h={450}>
          <div className="userdetails">
            <div>
              <div>
                <img src={profile} alt='profile' />
              </div>
              <div className='userinfo'>
                <div>
                  <div>
                    <span>Full Name</span>
                    <span>User Name</span>
                    <span>Country</span>
                  </div>
                  <div>
                    <span>{user.firstname}{user.lastname}</span>
                    <span>{user.username}</span>
                    <span>{user.country || "not added"}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>livesin</span>
                    <span>worksAt</span>
                    <span>relationShip</span>
                  </div>
                  <div>
                    <span>{user.livesin || "not added"}</span>
                    <span>{user.worksAt || "not added"}</span>
                    <span>{user.relationShip || "not added"}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>followers</span>
                    <span>{user.followers.length}</span>
                  </div>
                  <div>
                    <span>followings</span>
                    <span>{user.following.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Posts">
            {posts.map((post, index) => (
              <Userposts key={index} data={post} />
            ))}
          </div>

        </ScrollArea>
      </Modal>
    </>
  )
}

export default Userdetails