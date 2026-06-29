
import express from "express";
const router = express.Router();
import Notes from "../models/notes.js";
import fetchUser from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";

router.get("/fetchNotes",fetchUser,async(req,res)=>{
    const UserId = req.body.user.id;
    const notes = await Notes.find({userId:UserId});
    res.send(notes);
})
router.get("/createNotes",fetchUser,
    [
        body("title", "title must be 3 character").isLength({ min: 3 }),
    
        body("description", "description must be 3 character").isLength({ min: 5 })
    
      ]
,async (req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    

    const {title,description,tag} = req.body;
    const data =await Notes.create({
        title,description,tag,user:req.user.id
    })
    res.json(data);
});

router.put("/updateNotes/:id",fetchUser,async (req,res)=>{
    const Id = req.params.id;
    const {title,description,tag} = req.body;
    const UserId = req.user.id;
    const notes = await Notes.findById(Id);
    if(!notes){
         return res.status(404).send("notes are not available");
    }
    if(notes.user.toString() != UserId){
        return res.status(401).send("can't access");
    }
    
    const note = {
        title:title,
        description:description,
        tag:tag,
    };
    const data = await Notes.findByIdAndUpdate(notes.id,
        {$set:note},
          {new:true});
    res.json(data);
});

router.delete("/deleteNotes/:id",fetchUser,async(req,res)=>{
  let Id = req.params.id;
  let note = await Notes.findById(Id);
  let UserId = req.user.id;
  if(!note){
    return res.status(404).send("Not found");
  }
  if(note.user.toString() != UserId){
    return res.status(401).send("cant't accesss !!!");

  }
 await Notes.findByIdAndDelete(Id);
  res.json("data is deleted successfully");
})
export default router;




