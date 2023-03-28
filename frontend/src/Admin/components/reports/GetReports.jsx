import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useQuery } from 'react-query';
import { getAllReports } from "../../api/request";
import { ReportDetails } from "../../data/userDetails";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const GetReports = () => {
    const { isLoading, error, data } = useQuery('AllReports', getAllReports);
    console.log("all user daaaaa", data)

    const columns = useMemo(ReportDetails, []);
    const handleDeleteRow = (row) => {

    }
    const getPostinfo = (row) => {
        alert("r")
        console.log("<<<row", row)
    }

    if (isLoading) return <div>Loadinggg....</div>;
    return (
        <>
            <MaterialReactTable columns={columns} data={data} renderRowActions={({ row, table }) => (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip arrow placement="left" title="Edit">
                        <IconButton onClick={() => getPostinfo(row)}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement="right" title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Box>
            )} />
        </>
    )
}

export default GetReports