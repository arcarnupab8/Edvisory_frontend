import React, { useEffect, useState } from 'react'
import style from './notecontainer.module.css';
import axios from 'axios';

export default function noteContainer({id, name, content, dateMade, group, madeby, onNoteClick}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.post('https://edvisory-backend.vercel.app/getuserinfo', {
          token: localStorage.getItem('authToken')
        });

        // console.log(response.data.data.name);

        if (response.data.data.name === madeby) {
          setShow(true);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://edvisory-backend.vercel.app/deleteNote/${id}`);

      console.log(response.data);
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={style.container}>
        <div className={style.details}>
          <p onClick={() => onNoteClick({ id, name, content, dateMade, group, madeby })}>{name}</p>
          <div>
            <p>{dateMade}</p>
            {","}
            <p>{madeby}</p>
          </div>
        </div>

        {show&&
          <div className={style.menu}>
            <img alt='EditBtn' src='./Edit_fill.svg' 
              onClick={() => onNoteClick({ id, name, content, dateMade, group, madeby }, 'edit')}
            />
            <img alt='DeleteBtn' src='./Trash.svg' 
              onClick={handleDelete}
            />
          </div>
        }
    </div>
  )
}
