import React, { useState,useEffect } from 'react'
import NotesContext from './NotesContext';
export default function NoteState(props) {

  
  const host = "http://localhost:8000/api/auth";
  const [notes, setNote] = useState([]);

  const fetchNotes = async () => {
    const response = await fetch(`${host}/fetchNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmEzY2Y1MzhjNjU5NWI5MzcxMTY1YzY5In0sImlhdCI6MTc4MjQ3MTA5MX0.zhqX0UDpQqDmNzKnmYpON3Ugje-Fs1tlXxuOdUDpI4c"
      },
    });

    const data = await response.json();
    setNote(data);
  

  };
   useEffect(()=>{
    fetchNotes();
   },[]);
  
   
const addNotes = async (tag, title, description) => {
       const response = await fetch(`${host}/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmEzY2Y1MzhjNjU5NWI5MzcxMTY1YzY5In0sImlhdCI6MTc4MjQ3MTA5MX0.zhqX0UDpQqDmNzKnmYpON3Ugje-Fs1tlXxuOdUDpI4c"
      },
       body: JSON.stringify({
            title,
            description,
            tag
        })
    });
    const data =await response.json();
    setNote(notes.concat(data));
    
    console.log("updated data is",data);
  
};

const deleteNotes = async (id) => {
  const response = await fetch(`${host}/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmEzY2Y1MzhjNjU5NWI5MzcxMTY1YzY5In0sImlhdCI6MTc4MjQ3MTA5MX0.zhqX0UDpQqDmNzKnmYpON3Ugje-Fs1tlXxuOdUDpI4c"
      },
    });
    
    const responseData = await response.json();
    console.log(responseData);

  const data = notes.filter((note) => {
    return note._id != id;
  })
  setNote(data);
};

const editNotes = (id, title, tag, description) => {
  const updatedNotes = notes.map((note) => {
    if (note._id.$oid == id) {
      return {
        ...note, tag, title, description
      };
    }
  });

  setNote(updatedNotes);
}

return (
  <div>
    <NotesContext.Provider value={{ notes, addNotes, deleteNotes, editNotes }}>
      {props.children}
    </NotesContext.Provider>
  </div>
)
};
