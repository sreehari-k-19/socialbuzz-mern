import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import style from "./emailVerify.module.scss";
import { Player } from '@lottiefiles/react-lottie-player';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../redux/Slice/AuthSlice';

// console.log(process.env.VERIFIY_URL, "urlll")

const Emailverify = () => {
    const dispatch = useDispatch()
    const { verify } = useSelector((state) => state.auth)
    const [validurl, setValidurl] = useState(false);
    const navigate = useNavigate();

    const param = useParams()
    const credentials = {
        id: param.id,
        token: param.token
    }

    // useEffect(() => {
    //     if(!verify){
    //         dispatch(verifyToken(credentials))
    //     }

    // }, [param])

    useEffect(() => {
        const EmailverifyUrl = async () => {

            try {
                const url = `http://localhost:5000/auth/${param.id}/verify/${param.token}`
                console.log(url)
                const { data } = await axios.get(url)
                setValidurl(true)
            } catch (error) {
                console.log(error);
                setValidurl(false);
            }

        }
        return (() => EmailverifyUrl());

    }, [param])
    return (
        <Fragment>
            {
                validurl ? (
                    <div className={style.emailSuccess}>
                        <div className={style.successBox}>
                            <Player
                                autoplay
                                loop
                                src="https://lottie.host/c2981c75-ed4b-40bb-9bb9-8fc612914daa/RPz6moqNM6.json"
                                style={{ height: '200px', width: '200px' }}
                            >

                            </Player>
                            <h2>Verified!</h2>
                            <p>You successfully verified account.</p>
                            <button onClick={() => navigate('/auth')}
                            >Login</button>
                        </div>
                    </div>
                ) : (
                    <div className={style.emailSuccess}>
                        <div className={style.successBox}>
                            <Player
                                autoplay
                                loop
                                src="https://assets6.lottiefiles.com/packages/lf20_elxq65jt.json"
                                style={{ height: '500px', width: '500px' }}
                            >


                            </Player>
                            <h2>not found</h2>
                        </div>
                    </div>
                )
            }
        </Fragment>

    )
}

export default Emailverify