import React, {useState} from 'react'
import  NoteContext  from './noteContext'
const NoteState = (props)=>{
    let notesInitial = [
        {
          "_id": "6257630edfb58ab9fe9492866",
          "user": "62514f25bfd6754d06d2b289",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-04-13T23:55:58.874Z",
        },
        {
          "_id": "6257630edfb58ab9fe949286",
          "user": "62514f25bfd6754d06d2b289",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-04-13T23:55:58.874Z",
        },
        {
          "_id": "6257630edfb58ab9fe9492863",
          "user": "62514f25bfd6754d06d2b289",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-04-13T23:55:58.874Z",
        },
        {
          "_id": "62576321dfb58ab9fe949288",
          "user": "62514f25bfd6754d06d2b289",
          "title": "My title",
          "description": "Please wake up early, you can",
          "tag": "personal",
          "date": "2022-04-13T23:56:17.895Z",
        }
      ]
      const [notes, setNotes] = useState(notesInitial);
      console.log("Noteitem");
      // Add a note
      const addNote = (title, description ,tag)=>{
        console.log("Adding a new note");
        const note = {
          "_id": 22 ,
          "user": "62514f25bfd6754d06d2b28911",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-04-13T23:56:17.895Z",
          "__v": 0
        }
        setNotes(notes.concat(note));
        // notes.push(note);
        // console.log(notes)
        // setNotes(notes);
      }

      // Delete a note
      const deleteNote = (id)=>{
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
        console.log("Deleting a Note" + id)
      }

      // Edit  a note
      const updateNote = ()=>{

      }
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote}}>
            {props.children }
        </NoteContext.Provider>
    )
}
export default NoteState;
