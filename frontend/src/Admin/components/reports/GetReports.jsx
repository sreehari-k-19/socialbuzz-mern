import React, { useCallback, useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { getAllReports, getPost } from "../../api/request";

import { Box, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';

import { Delete, Edit } from '@mui/icons-material';
import PostDetails from "./PostDetails";
import { ReportDetails } from "../../data/userDetails";

const GetReports = () => {
    const [reports, setReports] = useState([])
    useEffect(() => {
        const getRepots = async () => {
            const { data } = await getAllReports()
            setReports(data)
        }
        getRepots()
    }, [])
    const [postModal, setPostModal] = useState(false)
    const [post, setPost] = useState({})
    const [postId, setPostId] = useState();
    const columns = useMemo(ReportDetails, []);
    const getPostinfo = async (postId) => {
        const { data } = await getPost(postId);
        console.log("userpost info",data)
        setPost(data)
        // setPostId(postId);
        setPostModal(true);
    }
    return (
        <>
            <MaterialReactTable columns={columns} data={reports} enableRowActions positionActionsColumn="last"
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                        <IconButton
                            color="secondary"
                            onClick={() => { getPostinfo(row.original.postId) }}
                        >
                            <InfoIcon />
                        </IconButton>
                    </Box>
                )} />
            {postModal ? <PostDetails
                postModal={postModal}
                setPostModal={setPostModal}
                post={post}
            /> : null}
        </>
    )
}

export default GetReports;

