import React from 'react'
import { useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import axios from 'axios';
import { set } from 'mongoose';
import { ClipLoader } from "react-spinners";



function ForgotPassword() {
    const primaryColor = "#ff4d2d";

    const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP, Step 3: Reset Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const[err,setErr]=useState("");
    const [loading,setLoading]=useState(false);

    const handleSendOtp = async ()=>{
        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`,{
            email},{ withCredentials:true });
            console.log(result.data);
            setErr("");
            setLoading(false);
            setStep(2);
        } catch (error) {
            setErr(error?.response?.data?.message);
            console.log("Error during sending OTP:", error);
            setLoading(false);
        }
    }

    const handleVerifyOtp = async ()=>{
        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`,{
            email,otp},{ withCredentials:true });
            console.log(result.data);
            setErr("");
            setLoading(false);
            setStep(3);
        } catch (error) {
            setErr(error?.response?.data?.message);
            console.log("Error during verifying OTP:", error);
            setLoading(false);
        }
    }

    const handleResetPassword = async ()=>{
        setLoading(true);
        if(newPassword !== confirmPassword){
            setErr("Passwords do not match");
            console.log("Passwords do not match");
            setLoading(false);
            return;
        }
        try {
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`,{
            email,newPassword},{ withCredentials:true });
            console.log(result.data);
            setLoading(false);
            setErr("");
            navigate("/signin");
        } catch (error) {
            setErr(error?.response?.data?.message);
            console.log("Error in password reset:", error);
            setLoading(false);
        }
    }
  return (
    <div className='flex w-full items-center justify-center min-h-screen p-4
    bg-[#fff9f6]'>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
            <div className='flex items-center gap-4 mb-4'>
                <IoArrowBackOutline size={30} className='text-[#ff4d2d] cursor-pointer' onClick={
                    ()=>navigate("/signin")
                }/>
                <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
            </div>
            {step == 1 
              && 
              <div>
                <div className='mb-6'>
                <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email</label>
                <input type="email" className='w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter your Email' 
                onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </div>
            <button className={`w-full mt-4 font-semibold rounded-lg py-2 transition duration-200
            bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            style={{backgroundColor:primaryColor, color:"white"}} onClick={handleSendOtp} disabled={loading}>
                {loading?<ClipLoader size={20} color="white"/>:"Send Otp"}
            </button>
            <p className='text-red-500 text-center my-[10px]'>*{err}</p>
              </div>}

              {step == 2 
              && 
              <div>
                <div className='mb-6'>
                <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Otp</label>
                <input type="email" className='w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter Otp' 
                onChange={(e)=>setOtp(e.target.value)} value={otp}/>
            </div>
            <button className={`w-full mt-4 font-semibold rounded-lg py-2 transition duration-200
            bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            style={{backgroundColor:primaryColor, color:"white"}} onClick={handleVerifyOtp} disabled={loading}>
                {loading?<ClipLoader size={20} color="white"/>:"Verify Otp"}
            </button>
            <p className='text-red-500 text-center my-[10px]'>*{err}</p>
              </div>}

              {step == 3 
              && 
              <div>
                <div className='mb-6'>
                <label htmlFor='newPassword' className='block text-gray-700 font-medium mb-1'>New Password</label>
                <input type="email" className='w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter New Password' 
                onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}/>
            </div>
            <div className='mb-6'>
                <label htmlFor='confirmPassword' className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                <input type="email" className='w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter Confirm Password' 
                onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
            </div>
            <button className={`w-full mt-4 font-semibold rounded-lg py-2 transition duration-200
            bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            style={{backgroundColor:primaryColor, color:"white"}} onClick={handleResetPassword} disabled={loading}>
                {loading?<ClipLoader size={20} color="white"/>:"Reset Password"}
            </button>
           {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
              </div>}
              

        </div>
    </div>
  )
}

export default ForgotPassword