import React, { useContext, useState } from 'react'
import NotesContext from '../context/NotesContext';
import Notes from './Notes';
import AddNotes from './AddNotes';



export default function Home() {

  const notes = useState(useContext(NotesContext));

  console.log(notes);
  return (
    <>
      <AddNotes/>
      <Notes/>
    </>

  )
}
