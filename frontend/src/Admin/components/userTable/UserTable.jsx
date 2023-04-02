import React, { useMemo, useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import { userdata, userColumnTitlle } from "../../data/userDetails";
import { useQuery } from 'react-query';
import { Box, IconButton } from '@mui/material';
// import { Delete as DeleteIcon, LockPersonIcon, InfoIcon } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import { getAllUsers, getUserrr } from "../../api/request";
import { Link, useNavigate } from "react-router-dom";
import Userdetails from "../userdetails/Userdetails";

const UserTable = () => {
  const [data, setData] = useState({})
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  // const { isLoading, error, data } = useQuery('Alluser', getAllUsers);
  useEffect(() => {
    const getUsers = async () => {
      const { data } = await getUserrr();
      setData(data);
    };
    getUsers();
  }, []);
  const columns = useMemo(userColumnTitlle, []);

  const handleUser = ({ original }) => {
    setUser(original)
    setModal(true)
  }
  // if (isLoading) return <div>Loadinggg....</div>
  return (
    <>
      <MaterialReactTable columns={columns} data={data} enableRowActions positionActionsColumn="last"
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <IconButton
              color="secondary"
              onClick={() => handleUser(row)}
            >
              <InfoIcon />
            </IconButton>
          </Box >
        )} />
        {modal?<Userdetails user={user} modal={modal} setModal={setModal} />:null}
    </>
  )
};

export default UserTable;