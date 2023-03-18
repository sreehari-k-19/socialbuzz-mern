import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useParams,useNavigate } from 'react-router-dom';
import { resetPasswordSchema } from '../../validation/Userathvalidation';
import style from "./forgotpassword.module.scss";
import logo from '../../../img/socialbuzzlogo.png';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/Slice/AuthSlice';
const ResetPassword = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ password: "", confirmpass: "" })
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const param = useParams()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
        mode: 'onBlur',
    });
    const handlesub = (data) => {
        let resetData={
            id:param.id,
            token:param.token,
            password:data.password,
            confirmPassword:data.confirmpass
        }
       dispatch(resetPassword({resetData,navigate}))
    }
    return (
        <div className={style.forgotpassword}>
            <div className={style.box}>
                <div>
                    <img src={logo} alt="logo" />
                    <h1>SocialBuzz</h1>
                </div>
                <h3>Reset your password</h3>
                <form onSubmit={handleSubmit(handlesub)}>
                    <label for="password-input">New password</label>
                    <input type="text" id="name-input" name='password'   {...register('password')} onChange={handleChange} value={data.password} />
                    <p>{errors.password?.message}</p>
                    <label for="name-input">Confirm New password</label>
                    <input type="password" id="confirm-input" name='confirmpass' {...register('confirmpass')} onChange={handleChange} value={data.confirmpass} />
                    <p>{errors.confirmpass?.message}</p>
                    <button className='button'>Reset my password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword