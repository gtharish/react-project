
import express from "express";
const router = express.Router();
import Notes from "../models/notes.js";
import fetchUser from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";


router.get("/fetchNotes",fetchUser,async(req,res)=>{
    const UserId = req.user.id;
    const notes = await Notes.find({user:UserId});
   
     res.send(notes);
})
router.post("/addNotes",fetchUser,
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

router.put("/editNotes/:id",fetchUser,async (req,res)=>{
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

router.delete("/deleteNotes/:id", fetchUser, async (req, res) => {
    try {
        const id = req.params.id;

        const note = await Notes.findById(id);

        if (!note) {
            return res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("You can't access this note");
        }

        await Notes.findByIdAndDelete(id);

        res.json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
export default router;




