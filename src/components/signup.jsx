import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import style from './signinup.module.css';
import axios from 'axios';

export default function signup() {
  const [data, setData] = useState({
    username:'',
    password:'',
    cpassword:'',
    name:''
  })
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.cpassword) {
      alert('Passwords not match!');
      setError('Passwords not match!');
      return;
    }

    // console.log(data);
    try {
      const response = await axios.post('https://edvisory-backend.vercel.app/signup', {
        username: data.username,
        password: data.password,
        name: data.name,
      });

      console.log(response.data);
      alert('User registered successfully');
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
      alert('Error registering user');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.headTitle}>Register</div>
      
      <form onSubmit={handleSubmit}>
        <div className={style.inputContent}>
          
          <div>
            <label>Username</label>
            <input 
              type='text'
              name='username'
              value={data.username}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label>Password</label>
            <input 
              type='password'
              name='password'
              value={data.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input 
              type='password'
              name='cpassword'
              value={data.cpassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Name</label>
            <input 
              type='text'
              name='name'
              value={data.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={style.submit}>
          <p>{error}</p>
          <input type='submit' value='Register'/>
          <Link to='/'>Do you already have an account ?</Link>
        </div>
      </form>
      
    </div>
  )
}
