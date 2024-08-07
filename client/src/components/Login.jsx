import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    const response = await axios.post(
      "http://localhost:5000/auth/login", body,
      {
        headers: {
          "Content-type": "application/json"
        }
      }
    )
      .then((response) => {
        const parseRes = response.data;
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
      })
      .catch((err) => {
        console.error(err.message);
      })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type='email'
          name='email'
          placeholder='email'
          value={email}
          onChange={e => onChange(e)}>
        </input>
        <input
          type='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={e => onChange(e)}>
        </input>
        <button>Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Login;