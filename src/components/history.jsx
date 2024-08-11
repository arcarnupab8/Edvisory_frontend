import React, { useEffect, useState } from 'react'
import style from './history.module.css';
import axios from 'axios';

export default function history({ onClose }) {
  const [logData, setLogdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userresponse = await axios.post('https://edvisory-backend.vercel.app/getuserinfo', {
          token: localStorage.getItem('authToken')
        });
        const userName = userresponse.data.data.name;

        const response = await axios.post('https://edvisory-backend.vercel.app/getAllLogs', {
          name: userName
        });
        const formattedLogs = response.data.Logs.map(log => ({
          ...log,
          dateFix: log.dateFix ? new Date(log.dateFix._seconds * 1000).toLocaleString() : 'N/A'
        }));

        setLogdata(formattedLogs);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);
  
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <img alt='closeButton' src='./Close_round.svg' onClick={onClose}/>
          <h2>ประวัติการแก้ไข</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>ชื่อโน๊ต</th>
              <th>เนื้อหา</th>
              <th>หมวดหมู่</th>
              <th>วันที่แก้ไข</th>
              <th>แก้ไขโดย</th>
            </tr>
          </thead>
          <tbody>
            {logData.map((log, index) => (
              <tr key={index}>
                <td>{log.oldname}</td>
                <td>{log.oldcontent}</td>
                <td>{log.oldgroup}</td>
                <td>{log.dateFix}</td>
                <td>{log.madeBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
