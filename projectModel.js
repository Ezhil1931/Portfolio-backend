import mongoose from "mongoose"

const projectSchema= new mongoose.Schema({
prTitle:String,
prDescription:String,
prGithup:String,
prNetlify:String
    
})


export const project = mongoose.model("project",projectSchema);