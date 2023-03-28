import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UilSetting } from "@iconscout/react-unicons";
import Home from "../../../img/home.png";
import Noti from "../../../img/noti.png";
import Comment from "../../../img/comment.png";
import ShareModal from "../sharemodal/ShareModal";
import TrendCard from "../trendCard/TrendCard";
import './rightside.scss';
import FollowersCard from "../followersCard/FollowersCard";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="../home">
          <img  style={{ position: "fixed"}}src={Home} alt="" />
        </Link>
        {/* <img style={{ position: "fixed"}} src={Noti} alt="" /> */}
        <Link to="../chat">
          <img  style={{ position: "fixed",marginLeft:"90px"}}src={Comment} alt="" />
        </Link>
      </div>
      <FollowersCard />
      {/* <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} /> */}
    </div>
  );
};
export default RightSide;
