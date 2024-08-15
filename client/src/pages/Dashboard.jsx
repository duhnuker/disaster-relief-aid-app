import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

import Footer from '../components/Footer';
import DonateCard from '../components/DonateCard';

const Dashboard = ({ setAuth }) => {

  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/dashboard/",
        {
          headers: { jwt_token: localStorage.token }
        }
      );

      const parseData = response.data;
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []); //end bracket makes useEffect only make one get request

  return (
    <div className='grid grid-cols-3 grid-rows-4 gap-4 place-items-center bg-red-900'>
      <div className='flex flex-col items-center col-start-2'>
        <img className='w-32 h-32 rounded-full mb-2' src='/logo.jpeg' alt='SafeHaven Logo'></img>
        <h1 className='text-2xl font-bold pb-2 text-white text-center'>Welcome {name}</h1>
        <button className='bg-gray-800 rounded-md text-white px-2 py-1 font-bold text-md hover:bg-gray-700 duration-300'
          onClick={e => logout(e)}>
          Logout
        </button>
        <div>
        {/* Header Logo */}
        </div>
        <h1 className='text-center text-white font-bold text-4xl pb-10'>Make an equal contribution to all current causes</h1>
        <div class="bg-white rounded-lg w-full border shadow block p-4 mb-4">
          <div class="w-full h-4 bg-gray-400 rounded-full">
            <div class="w-3/4 h-full text-center text-xs text-black font-bold bg-yellow-400 rounded-full">
              75%
            </div>
          </div>
        </div>
        <button className='text-white font-bold bg-gray-800 rounded-md px-2 py-1 text-md hover:bg-gray-700 duration-300'>Donate Now</button>
      </div>
      <div className='flex flex-col col-start-2 row-start-2'>
        <h2 className='text-4xl font-bold text-white text-center'>Or make individual contributions,</h2>
        <img src='/arrowdown.png' alt='Arrow Down' className='animate-bounce' />
      </div>
      <div className='flex flex-col row-start-3 col-start-1 p-4'>
        <DonateCard
          name="Bushfire"
          img="/bushfire.jpg"
          description="Bushfire Description"
        />
      </div>
      <div className='flex flex-col row-start-3 col-start-2 p-4'>
        <DonateCard
          name="Tornado"
          img="/tornado.jpg"
          description="Tornado Description"
        />
      </div>
      <div className='flex flex-col row-start-3 col-start-3 p-4'>
        <DonateCard
          name="General Supply"
          img="/supply.jpg"
          description="General Description"
        />
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard;