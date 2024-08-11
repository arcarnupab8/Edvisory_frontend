import React, { useEffect, useState } from 'react'
import style from './editnote.module.css'
import axios from 'axios';

export default function editNote({id, name, content, dateMade, group, madeBy, onClose }) {
    const [data, setData] = useState({
        id: id,
        name: name,
        content: content,
        dateMade: dateMade,
        group: group,
        madeBy: madeBy
    })
    const [groupData, setGroupData] = useState([]);
    const [newGroup, setNewGroup] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('https://edvisory-backend.vercel.app/getAllNotes');
                const allGroup = response.data.map(note => note.group);
                const uniqueGroups = [...new Set(allGroup)];

                setGroupData(uniqueGroups);
            } catch (error) {
                console.log(error);
            }
        };

        fetchGroups();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
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

    const handleSave = async (e) => {
        e.preventDefault();
        
        const updatedData = {
            noteId: data.id,
            newName: data.name,
            newContent: data.content,
            newGroup: data.group,
            madeBy: data.madeBy
        };
    
        try {
            const response = await axios.post('https://edvisory-backend.vercel.app/editNote', updatedData);
            console.log(response.data);
            setError(response.data.message);
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }
    };

  return (
    <div className={style.container}>
        <div className={style.content}>
            <div className={style.title}>
                <img alt='closeButton' src='./Close_round.svg' onClick={onClose}/>
                <h2>แก้ไขโน๊ต</h2>
            </div>
        <form onSubmit={handleSave}>
            <div className={style.inputContent}>
                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={data.name} 
                        onChange={handleInputChange} 
                    />
                </div>
                
                <div>
                    <label>Content</label>
                    <textarea 
                        name="content" 
                        value={data.content} 
                        onChange={handleInputChange}
                        cols={60}
                        rows={4}
                    />
                </div>
                
                <div>
                    <div className={style.groupContainer}>
                        <label>Group</label>
                        <div>
                            <select name='group' onChange={handleGroupChange} value={data.group} required>
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
                                    onChange={handleInputChange}
                                    name='group'
                                    required
                                />
                            )}
                        </div>
                    </div>
                </div>
                
                <div className={style.submit}>
                    <input type='submit' value='Confirm'/>
                    <p>{error}</p>
                </div>
            </div>
        </form>
      </div>
    </div>
  )
}
