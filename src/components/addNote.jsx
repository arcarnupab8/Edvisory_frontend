import React, { useEffect, useState } from 'react'
import style from './addnote.module.css';
import axios from 'axios';

export default function addNote({ onClose }) {
    const [data, setData] = useState({
        name: '',
        content: '',
        dateMade: '',
        group: '',
        madeBy: ''
    })
    const [groupData, setGroupData] = useState([]);
    const [newGroup, setNewGroup] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
          try {
            const response = await axios.get('https://edvisory-backend.vercel.app/getAllNotes');
            const userResponse = await axios.post('https://edvisory-backend.vercel.app/getuserinfo', {
                token: localStorage.getItem('authToken')
            });

            const allGroup = response.data.map(note => note.group);
            const uniqueGroups = [...new Set(allGroup)];

            setGroupData(uniqueGroups);
            setData({
                ...data,
                madeBy: userResponse.data.data.name
            });

          } catch (error) {
            console.log(error);
          }
        };
    
        fetchNotes();
      }, []);

    const handleChange = (e) => {
        setData({
        ...data,
        [e.target.name]: e.target.value,
        });
    };

    const handleGroupChange = (e) => {
        if (e.target.value === 'new') {
            setNewGroup(true);
            setData({
                ...data,
                group: ''
            });
        } else {
            setNewGroup(false);
            setData({
                ...data,
                group: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setData({
            ...data,
            dateMade: Date()
        })

        if(data.name !== '' && data.content !== '' && data.group !== '' && data.dateMade !== ''){

            // console.log(data);
            try {
                const response = await axios.post('https://edvisory-backend.vercel.app/addNote', data);
                console.log(response.data);
                alert('Note added successfully');
                window.location.reload();
            } catch (error) {
                console.error(error);
                alert('Error adding note');
            }
        }
        else{
            setError('Please select group');
        }
    };

  return (
    <div className={style.container}>
        <div className={style.content}>
            <div className={style.headTitle}>
                <img alt='closeButton' src='./Close_round.svg' onClick={onClose}/>
                <h1>เพิ่มโน๊ต</h1> 
            </div>

            <form onSubmit={handleSubmit}>
                <div className={style.inputContent}>
                    <div>
                        <label>ชื่อโน็ต</label>
                        <input
                            type='text'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>เนื้อหา</label>
                        <textarea
                            name='content'
                            value={data.content}
                            onChange={handleChange}
                            cols={60}
                            rows={4}
                            required
                        />
                    </div>

                    <div>
                        <div className={style.groupContainer}>
                            <label>group</label>
                            <div>
                                <select name='group' onChange={handleGroupChange} value={data.group}>
                                    <option value='-'>Select Group</option>
                                        {groupData.map((group, index) => (
                                            <option key={index} value={group}>{group}</option>
                                        ))}
                                    <option value='new'>Create New Group</option>
                                </select>
                                    {newGroup && (
                                        <input
                                            type='text'
                                            placeholder='Enter new group name'
                                            value={data.group}
                                            onChange={handleChange}
                                            name='group'
                                            required
                                        />
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className={style.submit}>
                        <input type='submit' value='Add Note'/>
                        <p>{error}</p>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
