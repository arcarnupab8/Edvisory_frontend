import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import style from './signinup.module.css';
import axios from 'axios';

export default function signin() {
  const [data, setData] = useState({
    username:'',
    password:''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(data);
    try {
      const response = await axios.post('https://edvisory-backend.vercel.app/signin', {
        username: data.username,
        password: data.password,
      });

      // console.log(response.data.token);
      const token = response.data.token;
      localStorage.setItem('authToken', token);

      alert('LogIn successfully');
      window.location.reload();
    } catch (error) {
      console.error(error);
      // console.log(error.response.data)
      setError(error.response.data);
    }

  };

  return (
    <div className={style.container}>
      <div className={style.headTitle}>Log In</div>
      
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
        </div>

        <div className={style.submit}>
          <p>{error}</p>
          <input type='submit' value='Log in'/>
          <Link to='/signup'>Don’t have an account ?</Link>
        </div>
      </form>
      
    </div>
  )
}
