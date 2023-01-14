import React, { useState } from "react";
import { UilPen } from "@iconscout/react-unicons";
import "./infoCard.scss";
import ProfileModal from "../profileModal/ProfileModal";

const InfoCard = () => {
  const [modalOpened, setModalOpened]=useState(false)

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Yor info</h4>
        <UilPen width='2rem' height='1.2rem' onClick={()=>{
          setModalOpened(true)
        }} />
        <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
      </div>
      <div className="info">
        <span>
            <b>Status</b>
        </span>
        <span>Single</span>
      </div>
      <div className="info">
        <span>
            <b>Lives in</b>
        </span>
        <span>Singlw</span>
      </div>
      <div className="info">
        <span>
            <b>Works at</b>
        </span>
        <span>Singlw</span>
      </div>
      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;
