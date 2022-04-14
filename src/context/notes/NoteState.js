import React, {useState} from 'react'
import  NoteContext  from './noteContext'
const NoteState = (props)=>{
    let notesInitial = [
        {
          "_id": "6257630edfb58ab9fe949286",
          "user": "62514f25bfd6754d06d2b289",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-04-13T23:55:58.874Z",
          "__v": 0
        },
        {
          "_id": "6257630edfb58ab9fe949286",
          "user": "62514f25bfd6754d06d2b289",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-04-13T23:55:58.874Z",
          "__v": 0
        },
        {
          "_id": "6257630edfb58ab9fe949286",
          "user": "62514f25bfd6754d06d2b289",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-04-13T23:55:58.874Z",
          "__v": 0
        },
        {
          "_id": "6257630edfb58ab9fe949286",
          "user": "62514f25bfd6754d06d2b289",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-04-13T23:55:58.874Z",
          "__v": 0
        },
        {
          "_id": "6257630edfb58ab9fe949286",
          "user": "62514f25bfd6754d06d2b289",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-04-13T23:55:58.874Z",
          "__v": 0
        },
        {
          "_id": "6257630edfb58ab9fe949286",
          "user": "62514f25bfd6754d06d2b289",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-04-13T23:55:58.874Z",
          "__v": 0
        },
        {
          "_id": "62576321dfb58ab9fe949288",
          "user": "62514f25bfd6754d06d2b289",
          "title": "My title",
          "description": "Please wake up early, you can",
          "tag": "personal",
          "date": "2022-04-13T23:56:17.895Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial);
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children }
        </NoteContext.Provider>
    )
}
export default NoteState;
