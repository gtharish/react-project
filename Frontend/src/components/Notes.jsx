import React, { useContext } from "react";
import NotesContext from "../context/NotesContext";

export default function Notes() {
  const notes = useContext(NotesContext);

  return (
    
    <div className="container m-3">
        <h1>this the notes</h1>
  <div className="row">
    {notes.map((note, index) => (
      <div className="col-md-3 mb-3" key={index}>
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">{note.Name}</h5>
            <p className="card-text">{note.Roll_NO}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}