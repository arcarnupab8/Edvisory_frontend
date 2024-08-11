import React, { useEffect, useState } from 'react'

import style from './navbar.module.css';
import axios from 'axios';

export default function navbar({ onToggleHistory }) {
    const [name, setName] = useState('Default');
    const [open, setOpen] = useState(false);

    const handleOpen = () =>{
      if(!open){
        setOpen(true)
      }else[
        setOpen(!open)
      ]
    }

    const handleSignout = () =>{
      localStorage.removeItem('authToken');

      window.location.reload();
    }

    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const response = await axios.post('https://edvisory-backend.vercel.app/getuserinfo', {
            token: localStorage.getItem('authToken')
          });

          // console.log(response.data.data.name);
          setName(response.data.data.name);
  
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchNotes();
    }, []);
  return (
    <nav>
        <div className={style.userProfile}>
          <p>{name}</p>
          <img alt='Profile' src='./User_circle.svg' onClick={handleOpen}/>

          {open&&
            <div className={style.menu}>
              <div onClick={onToggleHistory}>History</div>
              <div onClick={handleSignout}>Sign Out</div>
            </div>
          }
        </div>
    </nav>
  )
}
