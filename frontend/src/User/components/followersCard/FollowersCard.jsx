import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../api/requests";
import User from "../user/User";
import {Followers } from '../../Data/FollowersData'
import Profile from "../../../img/defaultProfile.png";
import "./followersCard.scss";

const FollowersCard = () => {
    const [persons,setPersons]=useState([])
    const { user } = useSelector((state) => state.auth.authData)

    useEffect(() => {
        const fetchPersons = async () => {
            const { data } = await getAllUsers()
            console.log("gett alll", data)
            setPersons(data)
            // return data;

        }
    return (()=>fetchPersons())
    // setPersons(data)
    }, [])
    return (
        <div className="FollowersCard" style={{ position: "fixed",top:"90px"}}>
            <h3>People you may know</h3>
            {persons.map((person, id) => {
                  if (person._id !== user._id) return <User person={person} key={id} />;
            })}
        </div>

    );
};

export default FollowersCard;
