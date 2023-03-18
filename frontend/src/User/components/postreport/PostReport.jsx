import React, { useEffect, useState } from 'react'
import { Modal, useMantineTheme } from "@mantine/core";
import style from './postreport.module.scss';
import { getReports } from '../../api/requests';
import { useDispatch, useSelector } from 'react-redux';
import { reportPost } from '../../redux/Slice/PostSlice';
const PostReport = ({ modalOpened, setModalOpened, id }) => {
    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth.authData)
    const [reportData, setReportdata] = useState([]);
    useEffect(() => {
        const fetchReports = async () => {
                const { data } = await getReports()
                console.log("reports", data)
                setReportdata(data)
        
        }
        fetchReports()
    }, [])

    const handleReport = (reason) => {
        dispatch(reportPost({ id, report: { userId: user._id, reason: reason } }))
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
            size="45%"
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <div className={style.reports}>
                {reportData.map((data) => {
                    return <p onClick={() =>{handleReport(data._id);setModalOpened(false)}} >{data.reportreason}</p>
                })}

            </div>

        </Modal>
    )
}

export default PostReport