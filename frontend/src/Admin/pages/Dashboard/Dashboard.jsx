import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Countbox from '../../components/countbox/Countbox';
import './dashboard.scss';
import { getDashboard } from '../../slice/Adminslice';
import Chart from '../../components/chart/Chart';

const Dashboard = () => {
  const { loading, data } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    return (() => dispatch(getDashboard()))
  }, []);
  if (loading) return <div>loadinngg.......</div>
  return (
    <div className="dashboard">
      <div className="countboxs">
        <Countbox head={"Total Users"} value={data?.totalusers} />
        <Countbox head={"Total Posts"} value={data?.totalposts} />
        <Countbox head={"Total Reports"} value={data?.totalreports} />
      </div>
      <div className="charts">
        <Chart title="Users" aspect={2 / 1} />
      </div>
    </div>
  );
};

export default Dashboard;
