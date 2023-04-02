import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { UpdateCoverPicture, updateProfilepicture } from "../../redux/Slice/AuthSlice";
import { Modal, useMantineTheme } from "@mantine/core";

const UpdateUserImages = ({ showModal, setShowModal, image, cover }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth.authData)
    const theme = useMantineTheme();
    const handleChangeProfile = () => {
        const data = new FormData()
        data.append("file", image)
        dispatch(updateProfilepicture({ id: user._id, file: data }))
        setShowModal(false)
    }
    const handleChangeCover = () => {
        const data = new FormData()
        data.append("file", image)
        dispatch(UpdateCoverPicture({ id: user._id, file: data }))
        setShowModal(false)
    }

    return (
        <Modal overlayColor={
            theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[2]
        }
            overlayOpacity={0.55}
            overlayBlur={3}
            size="55%"
            opened={showModal}
            onClose={() => setShowModal(false)}>
            <div className="changeImage">
                <h1>hh</h1>
                <img src={URL.createObjectURL(image)} alt="" />
                {cover ? <button onClick={handleChangeCover}>cover</button> : <button onClick={handleChangeProfile}>profile</button>}
            </div>
        </Modal>
    )
}

export default UpdateUserImages