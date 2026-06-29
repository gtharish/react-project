import React from 'react'
import NotesContext from './NotesContext';
export default function NoteState(props) {
const state = [{
Name:"harihs singh",
Roll_NO:25,
},
{
Name:"harihs singh",
Roll_NO:25,
},
{
Name:"harihs singh",
Roll_NO:25,
}];
  return (
    <div>
      <NotesContext.Provider value = {state}>
        {props.children}
      </NotesContext.Provider>
    </div>
  )
}
