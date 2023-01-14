import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import {data, userColumnTitlle} from "../../Data/UserDetails";

//nested data is ok, see accessorKeys in ColumnDef below

const Table = () => {
  //should be memoized or stable
  const columns = useMemo(userColumnTitlle, []);

  return <MaterialReactTable columns={columns} data={data} />;
};

export default Table;
