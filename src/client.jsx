import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './client.module.css'

import Navbar from './components/navbar';
import NoteContainer from './components/noteContainer';
import Addnote from './components/addNote';
import Notedetails from './components/notedetails';
import Editnote from './components/editNote';
import History from './components/history';

function client() {
  const [notesData, setNotesData] = useState([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showNote, setShownote]= useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showEditNote, setShowEditNote] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('https://edvisory-backend.vercel.app/getAllNotes');
        const formattedNotes = response.data.map(note => {
          const dateMade = note.dateMade ? new Date(note.dateMade._seconds * 1000) : null;
          return {
            ...note,
            dateMade,
          };
        });

        sortNotes(formattedNotes, sortOrder);

      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, [sortOrder]);

  const sortNotes = (notes, order) => {
    const sortedNotes = notes.sort((a, b) => {
      if (order === 'desc') {
        return b.dateMade - a.dateMade;
      } else {
        return a.dateMade - b.dateMade;
      }
    });

    const formattedNotesWithDate = sortedNotes.map(note => ({
      ...note,
      dateMade: note.dateMade ? note.dateMade.toLocaleDateString() : 'N/A'
    }));

    setNotesData(formattedNotesWithDate);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  const handleAddNoteClick = () => {
    setShowAddNote(true);
  };
  const handleClosePopup = () => {
    setShowAddNote(false);
    setShownote(false);
    setShowEditNote(false);
    setShowHistory(false);
    setSelectedNote(null);
  };

  const handleNoteClick = (note, action = 'view') => {
    setSelectedNote(note);
    if (action === 'edit') {
      setShowEditNote(true);
      setShownote(false);
    } else {
      setShownote(true);
      setShowEditNote(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className={style.container}>
      <div className={style.Nav}>
        <Navbar onToggleHistory={toggleHistory}/>
      </div>
      <div className={style.content}>
        <div className={style.sortButton}>
          <button onClick={toggleSortOrder}>
            {sortOrder === 'desc' ? 'Sort by Oldest' : 'Sort by Newest'}
          </button>
        </div>
        <div className={style.containerNotes}>
          {notesData.map((data, index) =>
            <NoteContainer
              key={index}
              id={data.id}
              name={data.name}
              content={data.content}
              dateMade={data.dateMade}
              group={data.group}
              madeby={data.madeBy}
              onNoteClick={(note, action) => handleNoteClick(note, action)}
            />
          )}
        </div>
        <div className={style.addButton} onClick={handleAddNoteClick}>
          <img alt='Add' src='./Chat_alt_add_fill.svg'/>
        </div>
      </div>

      {showAddNote && (
        <div className={style.popupBackground}>
          <div className={style.popupContent}>
            <Addnote onClose={handleClosePopup} />
          </div>
        </div>
      )}

      {showNote && selectedNote &&(
        <div className={style.popupBackground}>
          <div className={style.popupContent}>
            <Notedetails 
              name={selectedNote.name}
              content={selectedNote.content}
              dateMade={selectedNote.dateMade}
              group={selectedNote.group}
              onClose={handleClosePopup}
            />
          </div>
        </div>
      )}

      {showEditNote && selectedNote && (
        <div className={style.popupBackground}>
          <div className={style.popupContent}>
            <Editnote
              id={selectedNote.id}
              name={selectedNote.name}
              content={selectedNote.content}
              dateMade={selectedNote.dateMade}
              group={selectedNote.group}
              madeBy={selectedNote.madeby}
              onClose={handleClosePopup}
            />
          </div>
        </div>
      )}

      {showHistory && (
        <div className={style.popupBackground}>
          <div className={style.popupContent}>
            <History 
              onClose={handleClosePopup}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default client