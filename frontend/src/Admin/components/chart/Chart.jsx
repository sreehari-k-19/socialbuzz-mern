import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import './chart.scss';

const Chart = ({ aspect, title }) => {
    const { loading, data } = useSelector((state) => state.admin);
    const [user, setUser] = useState([]);
    const [postData, setPostData] = useState([])
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );
    useEffect(() => {
        if (data) {
            const statsList = [...data.userbymonth].sort((a, b) => a._id - b._id);
            statsList.map((item) =>
                setUser((prev) => [
                    ...prev,
                    { name: MONTHS[item._id - 1], "New User": item.total },
                ])
            );

            return () => {
                setUser([]);
            };
        }
    }, [])  

    useEffect(() => {

        if (data) {
          const statsList = [...data.postbymonth].sort((a, b) => a._id - b._id);
          const updatedData = statsList.map((item) => {
            return {
              name: MONTHS[item._id - 1],
              "New Post": item.total,
            };
          });
          setPostData(updatedData);
        }
      }, []);
      

    if (loading) return <div>Loadingggggg</div>
    return (
        <div className="chart">
            {user.length !== 0 && (
                <>
                    <div className="container">
                        <ResponsiveContainer width="100%" height="88%" aspect={aspect}>
                            <BarChart
                                data={user}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                                <XAxis dataKey="name" stroke="green" />
                                <YAxis stroke="green" />
                                <Tooltip />
                                <Bar dataKey="New User" style={{ fill: "crimson", width: "10px", strokeWidth: 1 }} barSize={40} fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="title">Number of users in mounth</div>
                    </div>
                    <div className="containera">
                        <ResponsiveContainer width="100%" height="88%" aspect={aspect}>
                            <BarChart
                                data={postData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                                <XAxis dataKey="name" stroke="blue" />
                                <YAxis stroke="green" />
                                <Tooltip />
                                <Bar dataKey="New Post" style={{ fill: "green", width: "10px", strokeWidth: 1 }} barSize={40} fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="title">Number of posts in mounth</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Chart;