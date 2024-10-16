'use client'
import React, { useContext, useState, useTransition } from 'react';
import { context } from '../../components/Authentication';
import Swal from 'sweetalert2'
import { getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";

import './style.css'

const handleGoogle = () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    console.log('dsdfsdf')
}

const Login = () => {
    const [toggle, setToggle] = useState(false)
    const [toggle2, setToggle2] = useState(false)
    // const navigate = useTransition();
    const { signIN, signUp, loading, setLoading } = useContext(context)





    const handleSubmitSignin = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        signIN(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;



                if (user) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                navigate('/')

            })
    }
    const [ok, setOk] = useState()
    const [okk, setOkk] = useState()
    const handleSubmitSignUp = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const name = e.target.name.value
        const photoURL = e.target.photoURL.value

        setOkk('')
        setOk('')

        if (password.length < 6) {

            setOkk("Your password must be 6 letters")
            return
        }
        else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {

            setOkk("Password must include both uppercase and lowercase letters")


            return
        }
        signUp(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const auth = getAuth();

                updateProfile(auth.currentUser, {
                    displayName: `${name}`, photoURL: `${photoURL}`
                }).then(() => {
                    setLoading(!loading)

                })

                if (user) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully Register",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                navigate('/')
            })
            .catch((error) => {


                setOk("Email already in use ")

            })
    }


    return (
        <>

            {/* only for large devices  */}
            <br />
            <br />
            <div className={toggle ? 'hidden lg:block cont s--signup' : 'hidden lg:block cont'}>
                <form onSubmit={handleSubmitSignin} className="form    sign-in">
                    <h2>Welcome</h2>
                    <label>
                        <span>Email</span>
                        <input

                            name='email'
                            type="email" />
                    </label>
                    <label>
                        <span>Password</span>
                        <input
                            name='password'
                            type="password" />
                    </label>
                    <p className="forgot-pass">Forgot password?</p>
                    <button className="submit">Sign In</button>
                    <button onClick={handleGoogle} type="" className="text-black border border-solid font-semibold bg-white  items-center "><FcGoogle size={25} className=' absolute left-1/2 -translate-x-16 ' />Google</button>


                </form>
                <div>

                </div>
                <div className="sub-cont">
                    <div className="img ">
                        <div className="img__text m--up">

                            <h3>Don't have an account? Please Sign up!</h3>
                        </div>
                        <div className="img__text m--in">

                            <h3>If you already has an account, just sign in.</h3>
                        </div>
                        <div onClick={() => setToggle(!toggle)} className="img__btn">
                            <span className="m--up ">Sign Up</span>
                            <span className="m--in">Sign In</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmitSignUp} className="form  ">
                        <h2>Create your Account</h2>
                        <label>
                            <span>Name</span>
                            <input
                                name='name'
                                type="text" />
                        </label>
                        <label>
                            <span>Email</span>
                            <input
                                name='email'
                                type="email" />
                        </label>
                        {
                            ok && <p className=' ml-3 text-center text-red-500'>{ok}</p>
                        }
                        <label>
                            <span>Password</span>
                            <input
                                name='password'
                                type="password" />
                        </label>
                        {
                            okk && <p className=' text-center ml-2 text-red-500'>{okk}</p>
                        }

                        <label>
                            <span>Photo URL</span>
                            <input
                                name='photoURL'
                                type="url" />
                        </label>
                        <button type="" className="submit">Sign Up</button>


                    </form >

                </div>
            </div>

            {/* for medium & for phones only  */}
            <div className="wrapper lg:hidden mx-auto">
                <div className="title-text">
                    {toggle2 ? <div className=" title signup">Signup Form</div> : <div className="title login">Login Form</div>}
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name="slide" id="login" checked />
                        <input type="radio" name="slide" id="signup" />
                        <label onClick={() => setToggle2(false)} for="login" className="slide login">Login</label>
                        <label onClick={() => setToggle2(true)} for="signup" className="slide signup">Signup</label>
                        <div className="slider-tab"></div>
                    </div>
                    <div className="form-inner">
                        <form onSubmit={handleSubmitSignin} action="#" className={toggle2 ? 'login  -ml-[50%]' : 'login  -ml-[0%]'}>
                            <div className="field">
                                <input className='text-left' type="text" placeholder="Email Address" name='email' required />
                            </div>
                            <div className="field ">
                                <input className='text-left' type="password" placeholder="Password" name='password' required />
                            </div>
                            <div className="pass-link"><a href="#">Forgot password?</a></div>
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Login" />



                            </div>
                            <div className='mt-4  '>
                                {/* <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                                    <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                                        Border Beam
                                    </span>
                                    <BorderBeam size={250} duration={12} delay={9} />
                                </div> */}
                                <button onClick={handleGoogle} type="" className="text-black border w-full border-solid font-semibold bg-white  items-center "><FcGoogle size={25} className={toggle2 ? ' relative hidden translate-x-40 ' : "absolute  block  left-1/2 -translate-x-14"} />Google</button>

                            </div>
                            <div className="signup-link">Not  member? <a href="">Signup now</a></div>
                        </form>
                        <form onSubmit={handleSubmitSignUp} action="#" className="signup ">
                            <div className="field">
                                <input className='text-left' name='name' type="text" placeholder="Your Name" required />
                            </div>
                            <div className="field">
                                <input className='text-left' type="email" placeholder="Email Address" name='email' required />
                            </div>
                            {
                                ok && <p className=' ml-3 text-red-500'>{ok}</p>
                            }
                            <div className="field">
                                <input className='text-left' type="password" placeholder="Password" name='password' required />
                            </div>
                            {
                                okk && <p className=' ml-2 text-red-500'>{okk}</p>
                            }
                            <div className="field">
                                <input className='text-left' type="url" name='photoURL' placeholder="Photo URL" required />
                            </div>

                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Signup" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </>
    );
};

export default Login;