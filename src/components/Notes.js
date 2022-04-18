import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext.js"
import AddNote from './AddNote.js';
import NoteItem from './NoteItem.js';

function Notes() {
  const context = useContext(noteContext);
  // console.log(context);
  const {notes, addNote} = context;
  return (
    <>
    <AddNote/>
    <div className="row my-3">
      <h2>Your Notes</h2>
      {/* {console.log("Hello")}
      {console.log(notes)} */}
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note}/>;
      })}
    </div>
    </>
  );
}

export default Notes;
