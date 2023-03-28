import React from 'react'
import { useSelector } from 'react-redux';
import ProfieCard from '../profileCard/ProfieCard'
import SearchBar from '../searchbar/SearchBar'
import './profileSide.scss';
const  ProfilSide = () => {
  const { user } = useSelector((state) => state.auth.authData);
  return (
    <div className="ProfilSide" >
        <SearchBar />
        <ProfieCard location="homePage" profileData={user}/>

    </div>
  )
}

export default ProfilSide