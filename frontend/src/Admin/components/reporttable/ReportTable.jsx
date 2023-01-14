import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import {data, userColumnTitlle} from "../../Data/Reports";

//nested data is ok, see accessorKeys in ColumnDef below

const ReportTable = () => {
  //should be memoized or stable
  const columns = useMemo(userColumnTitlle, []);

  return <MaterialReactTable columns={columns} data={data} />;
};

export default ReportTable;
