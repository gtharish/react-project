import React, { useContext, useRef, useState } from "react";
import NotesContext from "../context/NotesContext";


export default function Notes() {
  const context = useContext(NotesContext);
  const { notes } = context;
  const { deleteNotes, editNotes } = context;

  let ref = useRef(null);
  let closeRef = useRef(null);
 
  const [edNote, setNotes] = useState({
    title:"",
    description: "",
    tag: ""
  });
  const [Id, setId] = useState({});
  const handleClick = (note) => {
    setId(note._id);
    setNotes({
      title:note.title,
    description: note.description,
    tag: note.tag
    });
    ref.current.click();

  }
  const handleChange = (e) => {
    setNotes({
      ...edNote, [e.target.name]: e.target.value
    })
    console.log(edNote);

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    editNotes(Id, edNote);
    closeRef.current.click();

  }

  return (

    <div className="container m-3">


      <button type="button" className=" d-none btn btn-primary"
        data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={edNote.title}
                    onChange={handleChange}
                    placeholder="Enter note title"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="4"
                    name="description"
                    value={edNote.description}
                    onChange={handleChange}
                    placeholder="Write your note here..."
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={edNote.tag}
                    onChange={handleChange}
                    placeholder="e.g. Personal, Work, Study"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="d-none btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>

              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>


      <h1 className="text-center mb-4 border-bottom pb-2">
  My Notes
</h1>
    {notes.length == 0 ?(
      <p>No notes available</p>
    ):
   <div className="row g-4 my-4">
  {notes.map((note, index) => (
    <div className="col-lg-4 col-md-6" key={index}>
      <div className="card note-card h-100 shadow-sm border-0">
        <div className="card-body d-flex flex-column">
          <span className="badge bg-primary align-self-start mb-3">
            {note.tag}
          </span>

          <h5 className="card-title fw-bold">{note.title}</h5>

          <p className="card-text text-muted flex-grow-1">
            {note.description}
          </p>

          <div className="d-flex justify-content-end gap-3 mt-3">
            <i
              className="fa-solid fa-trash text-danger action-icon"
              onClick={() => deleteNotes(note._id)}
            ></i>

            <i
              className="fa-regular fa-pen-to-square text-primary action-icon"
              onClick={() => handleClick(note)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
    }
      
    </div>
  );
}