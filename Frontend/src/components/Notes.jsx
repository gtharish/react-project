import React, { useContext } from "react";
import NotesContext from "../context/NotesContext";
export default function Notes() {
  const context = useContext(NotesContext);
  const { notes } = context;
  const {deleteNotes} = context;

  return (

    <div className="container m-3">
      <h1>this the notes</h1>
      <div className="row">
        {notes.map((note, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{note.tag}</h5>
                <p className="card-text">{note.titile}</p>
                <p className="card-text">{note.description}</p>
                <div className="d-flex justify-content-between mt-3">
                  <i className="fa-solid fa-trash text-danger" onClick = {()=>{console.log(note);deleteNotes(note._id)}}></i>
                  <i className="fa-regular fa-pen-to-square text-primary" ></i>
                </div>
              </div>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}