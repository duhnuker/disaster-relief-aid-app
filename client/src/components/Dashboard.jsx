import React, { useState, useEffect } from 'react'
import axios from 'axios';

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
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []); //end bracket makes useEffect only make one get request

  return (
    <div>
      <h1>Welcome {name}</h1>
      <button
      onClick={e => logout(e)}>
      Logout
      </button>
    </div>
  )
}

export default Dashboard;