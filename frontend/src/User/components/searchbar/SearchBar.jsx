import React from "react";
import logo from '../../../img/socialbuzzlogo.png'
import { UilSearch } from "@iconscout/react-unicons";
import './searchBar.scss'
const SearchBar = () => {
  return (
    <div className="LogoSearch" style={{ position: "fixed",top:"inherit"}}>
      <img src={logo} alt="" style={{width:"40px",height:"40px"}}/>
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
