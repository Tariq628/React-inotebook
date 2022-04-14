import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext.js"
import NoteItem from './NoteItem.js';

function Notes() {
  const context = useContext(noteContext);
  console.log(context);
  const { notes, setNotes } = context;
  return (
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <NoteItem note={note}/>;
      })}
    </div>
  );
}

export default Notes;
