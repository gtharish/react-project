import express from "express";
import ConnectTo from "./db.js";
import authRoute from "./routes/auth.js";
import notesRoute from "./routes/notes.js";
import User from "./models/user.js";
import cors from "cors";

const app = express();
app.use(cors("http://localhost:5173/"));
app.use(express.json());

async function start(){
   await ConnectTo();


app.listen("8000",()=>{
    console.log("i am listening ");
})
}
start();
app.get("/",(req,res)=>{
res.send("this is home page");
});
app.use("/api/auth",authRoute);
app.use("/api/auth",notesRoute);


