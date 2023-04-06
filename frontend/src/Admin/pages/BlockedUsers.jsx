import React, { useMemo, useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from "react-redux";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { fetchblockedUsers } from "../api/request";
import { blockedUsers } from '../data/userDetails';
import Userdetails from "../components/userdetails/Userdetails";
import { blockUser } from "../slice/Adminslice";

const BlockedUsers = () => {
  const [data, setData] = useState({})
  const [user, setUser] = useState({})
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const getBlockedUsers = async () => {
      const { data } = await fetchblockedUsers();
      setData(data);
    };
    getBlockedUsers();
  }, []);
  const columns = useMemo(blockedUsers, []);
  const handleUser = ({ original }) => {
    setUser(original)
    setModal(true)
  }
  const unBlockeuser = (row) => {
    dispatch(blockUser(row.original._id)).then(() => {
      const users = data.filter((user) => user._id !== row.original._id)
      setData(users)
    })
  }
  return (
    <div>
      <MaterialReactTable columns={columns} data={data} enableRowActions positionActionsColumn="last"
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <IconButton
              color="secondary"
              onClick={() => handleUser(row)}
            >
              <InfoIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => unBlockeuser(row)}
            >
              <LockPersonIcon />
            </IconButton>
          </Box >
        )} />
      {modal ? <Userdetails user={user} modal={modal} setModal={setModal} /> : null}

    </div>
  )
}

export default BlockedUsers