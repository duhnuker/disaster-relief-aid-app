import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Login = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const body = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        body,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      localStorage.setItem("token", response.data.jwtToken);
      setAuth(true);
      toast.success("Logged in successfully!");

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='grid grid-cols-3 grid-rows-3 h-screen w-screen place-items-center bg-red-900'>
      <div className='flex flex-col items-center justify-center border-4 border-red-800 rounded-3xl shadow-2xl col-start-2 row-start-2 p-5 min-h-full min-w-full'>
      <img className='w-32 h-32 rounded-full my-5' src='/logo.jpeg' alt='SafeHaven Logo'></img>
        <h1 className='text-5xl font-bold pb-8 text-white text-center'>Welcome back,</h1>
        <form onSubmit={onSubmitForm}>
          <input className='border-2 border-gray-900 mb-2 font-bold text-lg pl-2 rounded-md'
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={e => onChange(e)}>
          </input>
          <br></br>
          <input className='border-2 border-gray-900 mb-3 font-bold text-lg pl-2 rounded-md'
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={e => onChange(e)}>
          </input>
          <br></br>
          <div className="text-center">
            <button className='bg-gray-800 rounded-md text-white px-2 py-1 font-bold mb-10 text-md hover:bg-gray-700 duration-300'>Login</button>
          </div>
        </form>
        <p className='text-white text-md pb-2'>Don't have an account?</p>
        <div className='mb-5'>
          <Link to="/register" className='bg-gray-800 rounded-md text-white px-2 py-1 text-md hover:bg-gray-700 duration-300'>Register here!</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;