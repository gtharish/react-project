import React, { useState, useEffect } from 'react'
import NotesContext from './NotesContext';
import { API_URL } from '../config';
export default function NoteState(props) {


  const host = API_URL;
  const [notes, setNote] = useState([]);
  const [isLogedIn,setisLogedIn] = useState(!!localStorage.getItem("token"));

  const fetchNotes = async () => {

    
      const response = await fetch(`${host}/fetchNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authToken": localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      setNote(data);
  };
 useEffect(() => {
  console.log("Calling fetchNotes...");
  if (isLogedIn) {
    fetchNotes();
  }
}, [isLogedIn]);


  const addNotes = async (tag, title, description) => {
    const response = await fetch(`${host}/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      },
      body: JSON.stringify({
        tag,
        title,
        description
      })
    });
    const data = await response.json();
    setNote(notes.concat(data));



  };

  const deleteNotes = async (id) => {
    const response = await fetch(`${host}/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      },
    });

    const responseData = await response.json();
    console.log(responseData);

    const data = notes.filter((note) => {
      return note._id != id;
    })
    setNote(data);
  };

  const editNotes = async (id, edNote) => {
    const { tag, title, description } = edNote;
    console.log("this is updated data", tag, title, description);
    const updatedNotes = notes.map((note) => {
      if (note._id == id) {
        return {
          ...note, tag, title, description
        };
      }
      return note;
    });

    const response = await fetch(`${host}/editNotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      },
      body: JSON.stringify({
        tag, title, description
      })

    });
    const res = response.json();
    console.log(res);


    setNote(updatedNotes);
  }

  return (
    <div>
      <NotesContext.Provider value={{ notes, addNotes, deleteNotes, editNotes ,isLogedIn,setisLogedIn}}>
        {props.children}
      </NotesContext.Provider>
    </div>
  )
};
