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

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1>Welcome {name}</h1>
    </div>
  )
}

export default Dashboard;