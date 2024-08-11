import React from 'react'
import style from './notedetails.module.css';

export default function notedetails({name, content, dateMade, group, onClose}) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <img alt='closeButton' src='./Close_round.svg' onClick={onClose}/>
          <h1>{name}</h1>
        </div>

        <div className={style.conts}>
          <label>เนื้อหา</label>
          <div>
            <p>{content}</p>
          </div>
        </div>

        <div className={style.details}>
          <p>
            <label>วันเวลาที่สร้าง:</label>
            {dateMade}
          </p>
          <p>
            <label>หมวดหมู่:</label>
            {group}
          </p>
        </div>
      </div>
    </div>
  )
}
