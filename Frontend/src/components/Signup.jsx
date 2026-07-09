import React,{useState,useContext} from 'react'
import {useNavigate} from "react-router-dom";
import NotesContext from '../context/NotesContext';



export default function Signup() {
    const context = useContext(NotesContext);
   const {setisLogedIn} = context;
    const navigate = useNavigate();
  const host =import.meta.env.VITE_API_URL;
const [credential,setCredential] = useState({
    name:"",
    email:"",
    password:"",
    
});
// const [credential,setCredential] = useState("");
 
const handleChange = (e)=>{

setCredential({
    ...credential,[e.target.name]:e.target.value
});
}
const {email,password,name} = credential;

const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body:JSON.stringify({
      email,password,name
      })
    });
    const json = await response.json();
    if(json.success){
     localStorage.setItem("token",json.authToken);
     setisLogedIn(true);
     navigate("/");
    }
    else{
     alert("signup failed");
    }

};


    return (
        <div>
            <form onSubmit = {handleSubmit}>
                 <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" minLength = "3" required  name ="name" value = {name} onChange = {handleChange} aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" minLength = "3" required name = "email" value = {email} onChange = {handleChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"  minLength = "3" required name = "password" value = {password} onChange = {handleChange}  />
                </div>
              
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
