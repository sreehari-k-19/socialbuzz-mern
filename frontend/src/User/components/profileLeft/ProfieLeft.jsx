import React from "react";
import FollowersCard from "../followersCard/FollowersCard";
import InfoCard from "../infoCard/InfoCard";
import SearchBar from "../searchbar/SearchBar";

const ProfieLeft = () => {
  return (
    <div className="ProfileSide">
      <SearchBar />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfieLeft;
