import React, { useState } from 'react'
import NoteContext from './noteContext'
const NoteState = (props) => {
  const localhost = "http://localhost:5000"
  let notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  // Get All notes
  const getNotes = async () => {
    const response = await fetch(`${localhost}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MTRmMjViZmQ2NzU0ZDA2ZDJiMjg5In0sImlhdCI6MTY0OTU1NTE3Mn0.j4h7WkoyrgI_jzsjwFzfuswtJAWXoBXMp9mZ4ib4768"
      },
    })
    const json = await response.json();
    console.log(json);
    setNotes(json)
  }
  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${localhost}/api/notes/addnote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MTRmMjViZmQ2NzU0ZDA2ZDJiMjg5In0sImlhdCI6MTY0OTU1NTE3Mn0.j4h7WkoyrgI_jzsjwFzfuswtJAWXoBXMp9mZ4ib4768"
        },
        body: JSON.stringify({ title, description, tag })
      }
    );
    const note = await response.json();
    setNotes(notes.concat(note)); // push updates the array concat returns the array
    console.log("Adding a new note");
  }

  // Delete a note
  const deleteNote = async (id) => {
    // Delete All notes
    const response = await fetch(`${localhost}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MTRmMjViZmQ2NzU0ZDA2ZDJiMjg5In0sImlhdCI6MTY0OTU1NTE3Mn0.j4h7WkoyrgI_jzsjwFzfuswtJAWXoBXMp9mZ4ib4768"
      },
    })
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    console.log("Deleting a Note" + id)
  }

  // Edit  a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${localhost}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MTRmMjViZmQ2NzU0ZDA2ZDJiMjg5In0sImlhdCI6MTY0OTU1NTE3Mn0.j4h7WkoyrgI_jzsjwFzfuswtJAWXoBXMp9mZ4ib4768"
      },
      body: JSON.stringify({ title, description, tag })
    })
    console.log(response);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
