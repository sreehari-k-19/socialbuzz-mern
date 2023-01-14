import React from "react";
import { UilSearch } from "@iconscout/react-unicons";
import './searchBar.scss'
const SearchBar = () => {
  return (
    <div className="LogoSearch">
      <img src="" alt="" />
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
