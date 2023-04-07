import React from "react";
import PostSide from "../../components/postSide/PostSide";
import ProfilSide from "../../components/profileSide/ProfilSide";
import RightSide from "../../components/rightside/RightSide";
import "./home.scss";
const Home = () => {
  return (
    <div className="Home">
      <ProfilSide />
      <PostSide ownUser={true} />
      <RightSide />
    </div>
  );
};

export default Home;
