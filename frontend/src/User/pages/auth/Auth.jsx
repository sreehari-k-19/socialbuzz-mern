import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Logo from "../../../img/socialbuzzlogo.png";
import { useDispatch, useSelector } from "react-redux";
import { changeForm, logIn, signUp, googleRegister } from "../../redux/Slice/AuthSlice";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from '@react-oauth/google';
import { signupvalidationSchema, loginvalidationSchema } from '../../validation/Userathvalidation'
import { yupResolver } from '@hookform/resolvers/yup';


import "./Auth.scss";
import axios from "axios";


const Auth = () => {

  const dispatch = useDispatch()
  const { loading, isSignup } = useSelector((state) => state.auth)
  const error = useSelector((state) => state.auth.error)
  const [data, setData] = useState({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(isSignup ? signupvalidationSchema : loginvalidationSchema),
    mode: 'onBlur',
  });
  const resetForm = () => {
    setData({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })
  }

  // if (isSignup==201) {
  //   resetForm()
  //   dispatch(changeForm(isSignup))
  // }
  useEffect(() => {
    resetForm()
  }, [isSignup])
  const handlesub = (data) => {
    console.log("userDataaaa", data)
    if (isSignup) {
      dispatch(signUp(data))
    } else {
      dispatch(logIn(data))
    }
  };
  const googelScu = (credentialResponse) => {
    console.log("crdiiiiii", credentialResponse)
  }
  const googleFail = (credentialResponse) => {
    console.log("crdiiiiii", credentialResponse)
  }
  const googelLogin = useGoogleLogin({
    onSuccess: codeResponse => {
      console.log(codeResponse)
      const {access_token}=codeResponse;
      dispatch(googleRegister(codeResponse))
    }
  });
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
        {/* onSubmit={handleSubmit} */}
        <form className="infoForm authForm" onSubmit={handleSubmit(handlesub)} >
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
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="infoInput"
                  name="firstname"
                  {...register('firstname')}
                  onChange={handleChange}
                  value={data.firstname}
                />
                <p>{errors.firstname?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="infoInput"
                  name="lastname"
                  {...register('lastname')}
                  onChange={handleChange}
                  value={data.lastname}
                />
                <p>{errors.lastname?.message}</p>
              </div>
            </div>
          )}
          <div>
            <div className="userNamediv">
              <input
                type="text"
                className="infoInput"
                name="username"
                placeholder="Usernames"
                {...register('username')}
                onChange={handleChange}
                value={data.username}
              />
              <p>{errors.username?.message}</p>
            </div>
          </div>
          <div>
            <div>
              <input
                type="password"
                className="infoInput"
                name="password"
                placeholder="Password"
                {...register('password')}
                onChange={handleChange}
                value={data.password}
              />
              <p>{errors.password?.message}</p>
              <div className="forgetpass"><Link to="/forgotpassword">forgotpassword ?</Link></div>
            </div>
            <div>
              {isSignup && (
                <input
                  type="password"
                  className="infoInput"
                  name="confirmpass"
                  placeholder="Confirm Password"
                  {...register('confirmpass')}
                  onChange={handleChange}
                  value={data.confirmpass}
                />
              )}
              <p>{errors.confirmpass?.message}</p>
            </div>
          </div>
          {
            isSignup && (
              <div>
                <input type="checkbox" name="acceptTerms" {...register('acceptTerms')} />
                <div>
                  <label htmlFor="acceptTerms">Accept terms and conditions</label>
                  <p>{errors.acceptTerms?.message}</p>
                </div>
              </div>
            )
          }
          <div>
            <span style={{ fontSize: "12px", cursor: "pointer" }} onClick={() => { dispatch(changeForm(isSignup)); resetForm(); reset() }}>
              {isSignup ? "Already have an account. Login!" : "Don't have an account please sign up"}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading}>
            {loading ? "loading..." : isSignup ? "Signup" : "Sign in"}
          </button>
        </form>
        <button className="googlebutton" onClick={googelLogin}><span><img src="" alt=""/><span>Google Login</span></span></button>
      </div>

    </div>
  );
};


export default Auth;
