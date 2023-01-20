import React from "react";
import { useState } from "react";
import "./Auth.scss";
import Logo from "../../../img/socialbuzzlogo.png";
import { useDispatch, useSelector } from "react-redux";
import { changeForm, logIn, signUp } from "../../redux/Slice/AuthSlice";


const Auth = () => {

  const dispatch = useDispatch()
  const { loading, isSignup } = useSelector((state) => state.auth)
  const error = useSelector((state) => state.auth.error)

  // const [isSignup, setisSignup] = useState(false)


  const [data, setData] = useState({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(data))
    } else {
      dispatch(logIn(data))
    }
  }

  const resetForm = () => {
    setData({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })
  }
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Social Buzz</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* <SignUp /> */}
      {/* rightSide */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit} >
          <h3>{isSignup ? "Sign up" : "Sign in"}</h3>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: error ? "block" : "none",
            }}
          >
            {error}
          </span>
          {isSignup && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}


          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignup && (

              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>

          <div>
            <span style={{ fontSize: "12px", cursor: "pointer" }} onClick={() => { dispatch(changeForm(isSignup)); resetForm() }}>
              {isSignup ? "Already have an account. Login!" : "Don't have an account please sign up"}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading}>
            {loading ? "loading..." : isSignup ? "Signup" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};


export default Auth;
