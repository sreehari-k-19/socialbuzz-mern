import React from 'react'
import FollowersCard from '../followersCard/FollowersCard';
import ProfieCard from '../profileCard/ProfieCard'
import SearchBar from '../searchbar/SearchBar'
import './profileSide.scss';
const  ProfilSide = () => {
  return (
    <div className="ProfilSide">
        <SearchBar/>
        <ProfieCard location="homePage"/>
        <FollowersCard/>
    </div>
  )
}

export default ProfilSide