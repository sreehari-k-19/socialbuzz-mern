import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../redux/Slice/AuthSlice";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const dispatch = useDispatch()
  const theme = useMantineTheme();
  const { password, ...others } = data;
  const [formData, setFormdata] = useState(others);
  const [coverPicture, setCoverpicture] = useState(null)
  const [profilePicture, setProfilepicture] = useState(null)
  const params = useParams()
  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const id =params.id;
    dispatch(updateUser({ id, formData }))
    setModalOpened(false);


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
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm"  onSubmit={handleSubmit}>  
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />

          <input
            type="text"
            className="infoInput"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData?.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData?.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData?.livesin}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData?.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationShip"
            placeholder="RelationShip Status"
            onChange={handleChange}
            value={formData?.relationShip}
          />
        </div>


        {/* <div>
          Profile Image
          <input type="file" name='profilePicture' />
          Cover Image
          <input type="file" name="coverPicture" />
        </div> */}

        <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;