import React, { useState } from 'react'
import { assets } from '../assets'
function Login() {
  console.log(assets.download)
  const [login,setLogin]=useState('login')
  const [isOTP,setisOTP]=useState(false)
  return (
    <>
        <div className='flex flex-col-reverse lg:flex-row w-full h-screen items-center justify-center  '>
            <div className=" hidden md:flex bg-cover bg-center h-7/10 lg:h-10/10 w-full lg:w-5/10 flex-col  justify-end p-7 " style={{ backgroundImage: `url(${assets.loginbg})` }} >
              {/* <img src={assets.download} alt="" className='h-[100%] w-[100%]' /> */}
              <p className='text-white text-3xl font-semibold'>Grow your buisiness with us
                <br />
                Over 10,000+ Trusted Buisiness
              </p>

            </div>
            
            <form action="" className={`${!isOTP? 'w-full md:w-1/2 flex flex-col items-start justify-center h-9/10 pt-12 gap-5 pl-20':'hidden'}`}>
                <h1 className='text-3xl font-semibold text-amber-700'>{login==='login'?'Login':'SignUp'}</h1>
                {login==='login'?'':<div className='flex flex-col justify-start w-full   gap-2'><p>Buisiness Name:</p> <input type="text" placeholder='Enter your Buisiness name ' className='w-2/3 md:w-2/3 h-6  border-b focus:outline-none border-gray-400 '/></div>}
                <div className='flex flex-col justify-start w-full   gap-2'><p>Buisiness Email:</p> <input type="email" placeholder='Enter your Buisiness Email ' className='w-2/3 h-6   border-b focus:outline-none border-gray-400'/></div>
                <button className='w-2/3 h-10 bg-amber-700 rounded-lg text-md text-white cursor-pointer'>{login==='login'?'LogIn':'SignUp'}</button>
                <hr className='border-gray-600' />
                <button className='p-4 flex flex-row justify-center items-center border w-5/6 md:w-2/3 h-7 rounded-xl 
                cursor-pointer'> <img src="https://www.google.com/favicon.ico" alt="" />Continue with Google</button>
              {login==='login'?<p>Don't have an account? <span className='text-blue-400 underline cursor-pointer'  onClick={()=>(setLogin('SignUp'))}>Sign Up</span></p>:<p>Already Registered? <span className='text-blue-400 underline cursor-pointer' onClick={()=>(setLogin('login'))}>Log In</span></p>}
              </form>
              <form action="" className={`${isOTP? 'w-full md:w-1/2 flex flex-col items-start justify-center h-9/10 pt-12 gap-5 pl-20':'hidden'}`}>
              <h1 className='text-3xl font-semibold text-amber-700'>OTP</h1>
              <div className='flex flex-col justify-start w-full   gap-2'><p>Enter OTP:</p> <input type='text' placeholder='Enter your 6 digit OTP ' className='w-2/3 md:w-2/3 h-6  border-b focus:outline-none border-gray-400 'pattern="[0-9]*" maxLength={6}/>
              <button className='w-2/3 h-10 bg-amber-700 rounded-lg text-md text-white cursor-pointer'> Verify Otp </button>
              </div>
              </form>
        </div>
    </>
  )
}

export default Login
