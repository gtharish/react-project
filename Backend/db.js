import mongoose from "mongoose";

export default  async function connectTO(){
    
    const URL = "mongodb+srv://iNotebook_db:pGvUC0ieOJT9e3kL@cluster0.axzla0p.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0";
   const connect = await mongoose.connect(URL);
   console.log("db are connected");

}