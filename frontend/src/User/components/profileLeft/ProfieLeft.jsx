import React from "react";
import FollowersCard from "../followersCard/FollowersCard";
import InfoCard from "../infoCard/InfoCard";
import SearchBar from "../searchbar/SearchBar";

const ProfieLeft = ({profileData}) => {
  return (
    <div className="ProfileSide">
      <SearchBar />
      <InfoCard profileData={profileData}/>
    </div>
  );
};

export default ProfieLeft;
