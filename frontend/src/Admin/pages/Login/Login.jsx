import React, { useState } from 'react'
import { useDispatch} from "react-redux";
import style from './login.module.scss';
import logo from '../../../img/socialbuzzlogo.png';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../slice/Authadmin';
const Login = () => {
  const dispatch =useDispatch()
  const navigate =useNavigate()
  const [data, setData] = useState({ password: "", email: "" })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit =()=>{
    console.log("adminlogin",data)
      dispatch(adminLogin(data))
  }
  return (
    <div className={style.forgotpassword}>
      <div className={style.box}>
        <div>
          <img src={logo} alt="logo" />
          <h2>SocialBuzz</h2>
        </div>
        <h2 className={style.forgothead}>Admin Login </h2>
        <p>Login with your email and password</p>
        <div className={style.form}>
          <label for="email-input">Email</label>
          <input type="email" placeholder='Enter your email' id="email-input" name='email' onChange={handleChange} value={data.email} />
          <label for="password-input">Password</label>
          <input type="password" placeholder='Enter your password' id="password-input" name='password' onChange={handleChange} value={data.password}/>
          <button className='button' onClick={handleSubmit} >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login