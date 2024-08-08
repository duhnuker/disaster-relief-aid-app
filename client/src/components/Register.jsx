import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

const Register = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await axios.post("http://localhost:5000/auth/register", body, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const parseRes = response.data;
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Registered Successfully");

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
        <input
          type='text'
          name='name'
          placeholder='name'
          value={name}
          onChange={e => onChange(e)}>
        </input>
        <button>Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Register;