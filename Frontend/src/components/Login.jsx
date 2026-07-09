import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import NotesContext from '../context/NotesContext';



export default function Login() {
   const context = useContext(NotesContext);
   const {setisLogedIn} = context;
    const navigate = useNavigate();
    const host = "http://localhost:8000/api/auth";
const [credential,setCredential] = useState({
    email:"",
    password:"",
});

 
const handleChange = (e)=>{
e.preventDefault();
setCredential({
    ...credential,[e.target.name]:e.target.value
});
}
const {email,password} = credential;

const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body:JSON.stringify({
      email,password
      })
    });
    const json = await response.json();
    if(json.success){
        localStorage.setItem("token",json.authToken);
        setisLogedIn(true);
        navigate("/")
    }
    else{
        alert("login failed");
    }
};


    return (
        <div className=' p-5'>
            <form onSubmit = {handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" minLength = "3" required ="true" name = "email" value = {email} onChange = {handleChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"  minLength = "3" required ="true" name = "password" value = {password} onChange = {handleChange}  />
                </div>
              
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
