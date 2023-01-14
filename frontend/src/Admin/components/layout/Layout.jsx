import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const Layout = () => {
  return (
    <div
      style={{
        padding: "50px 0px 0px 370px",
      }}
    >
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
