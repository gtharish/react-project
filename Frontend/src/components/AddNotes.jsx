import React,{useContext,useState} from 'react'
import NotesContext from '../context/NotesContext'

export default function AddNotes() {
  const context = useContext(NotesContext);
  const {addNotes} = context;
  const [note,setNote] = useState({
    "tag":"",
    "title":"",
    "description":"",
  });
  const handleChange = (e)=>{
    setNote({
      ...note,[e.target.name]:e.target.value
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    addNotes(note.tag,note.title,note.description);
    setNote({
       "tag":"",
    "title":"",
    "description":"",
    })
  }
  return (
    <div>
      <div className="container my-4">
        <h2 className=" text-center mb-4">Add a Note</h2>

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
              value = {note.title}
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
               value = {note.description}
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
               value = {note.tag}
              onChange={handleChange}
              placeholder="e.g. Personal, Work, Study"
            />
          </div>

          <button type="submit" onClick = {handleSubmit} className="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
};
