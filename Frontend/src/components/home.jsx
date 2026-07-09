import React, { useContext, useState } from 'react'
import NotesContext from '../context/NotesContext';
import Notes from './Notes';
import AddNotes from './AddNotes';
import Login from './Login';

export default function Home() {
  return (
    <>
      <AddNotes />
      <Notes />
    </>

  )
}
