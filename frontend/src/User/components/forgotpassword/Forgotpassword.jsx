import React, { useState } from 'react'
import style from './forgot.module.scss';
import { useDispatch } from "react-redux";
import logo from '../../../img/socialbuzzlogo.png';
import { forgotPassword } from '../../redux/Slice/AuthSlice';

const Forgotpassword = () => {
    const dispatch = useDispatch()
    const [email,setEmail]=useState();
  return (
    <div className={style.forgotpassword}>
       <div className={style.box}>
                <div>
                    <img src={logo} alt="logo" />
                    <h2>SocialBuzz</h2>
                </div>
                <h2 className={style.forgothead}>Forgot password ?</h2>
                <p>No worries, we'll send you reset Instructions.</p>
                <div className={style.form}>
                    <label for="email-input">Email</label>
                    <input type="eamil" defaultValue={email} placeholder='Enter your email' id="email-input" onChange={(e)=>setEmail(e.target.value)} name='username' />
                    <button className='button' onClick={()=>dispatch(forgotPassword({username:email}))}>Reset password</button>
                </div>
            </div>
    </div>
  )
}

export default Forgotpassword