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
    <div className='grid grid-cols-1 md:grid-cols-3 grid-rows-5 gap-4 place-items-center bg-red-900'>
      {/* Header Logo */}
      <div className='flex flex-col items-center col-start-1 md:col-start-2'>
        <img className='w-32 h-32 rounded-full mb-2' src='/logo.jpeg' alt='SafeHaven Logo'></img>
        <h1 className='text-xl md:text-2xl font-bold pb-2 text-white text-center'>Welcome {name}</h1>
        <button className='bg-gray-800 rounded-md text-white px-2 py-1 font-bold hover:bg-gray-700 duration-300'
          onClick={e => logout(e)}>
          Logout
        </button>
      </div>
      {/* Donate to all section */}
      <div className='col-span-1 md:col-span-3 row-start-2 text-white font-bold text-center'>
        <h1 className='text-2xl md:text-4xl pb-10'>Our total progress for current missions!</h1>
        <div className='flex justify-center'>
          <div className="bg-white rounded-lg w-3/4 md:w-full border shadow-2xl block p-4 mb-4">
            <div className="w-full h-4 bg-gray-400 rounded-full">
              <div className="w-3/4 h-full text-center text-xs text-black bg-yellow-400 rounded-full">
                75%
              </div>
            </div>
          </div>
        </div>
        <p className='text-center py-4'>Make an equal contribution to all our current causes now below :</p>
        <button className='text-white font-bold bg-gray-800 rounded-md px-2 py-1 mt-2 text-md hover:bg-gray-700 duration-300'>Donate</button>
      </div>
      {/* Arrow Down Section */}
      <div className='flex flex-col col-start-1 md:col-start-2 row-start-3 text-center items-center'>
        <h2 className='text-2xl md:text-4xl font-bold text-white pb-28'>Or make individual contributions,</h2>
        <img src='/arrowdown.png' alt='Arrow Down' className='animate-bounce text-center w-72' />
      </div>
      {/* Cards Section */}
      <div className='flex flex-col row-start-4 col-start-1'>
        <DonateCard
          name="Adelaide Bushfires"
          img="/bushfire.jpg"
          description="Help Adelaide recover from the bushfires. Your donation provides essential aid and support to affected communities. Give today to make an impact."
        />
      </div>
      <div className='flex flex-col row-start-5 md:row-start-4 col-start-1 md:col-start-2'>
        <DonateCard
          name="Kansas Tornado Relief"
          img="/tornado.jpg"
          description="Help those affected by the Kansas tornado. Your donation provides urgent relief and support to rebuild lives. Give now to make a difference."
        />
      </div>
      <div className='flex flex-col row-start-6 md:row-start-4 col-start-1 md:col-start-3'>
        <DonateCard
          name="Yemen Care Packages"
          img="/supply.jpg"
          description="Support relief efforts in a war-torn nation where over 80% live in poverty. Your donation can provide essential aid and hope. Donate today."
        />
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard;