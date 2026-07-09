import mongoose from "mongoose";
require("dotenv").config();
export default  async function connectTO(){
    
    const URL = process.env.MONGO_URL
   const connect = await mongoose.connect(URL);
   console.log("db are connected");

}