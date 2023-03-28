import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { userdata, userColumnTitlle } from "../../data/userDetails";
import { useQuery } from 'react-query';
import { getAllUsers } from "../../api/request";

const UserTable = () => {
  const { isLoading, error, data } = useQuery('Alluser', getAllUsers);
  const columns = useMemo(userColumnTitlle, []);
  if (isLoading) return <div>Loadinggg....</div>
  return <MaterialReactTable columns={columns} data={data} />;
};

export default UserTable;