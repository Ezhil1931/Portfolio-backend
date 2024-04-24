import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import {project} from "./projectModel.js"

const app=express();
const PORT=process.env.PORT||3001
const mongodbUrl="mongodb+srv://ezhilbruce:ezhil1940@mydatabase.e2ac7dw.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabase"

app.use(express.json());
app.use(cors(
    {
        origin:"https://portfolio-api-ftmc.onrender.com/projects"
    }
));



app.get("/",async(req,res)=>{

    res.json({"message":"Its is worked"})

})

app.get("/projects",async(req,res)=>{
const list=await project.find({});

res.send(list);


})
app.post('/projects',async(req,res)=>{

try{

    if(!req.body.prTitle||!req.body.prDescription||!req.body.prNetlify||!req.body.prGithup){

        res.send({"message":"Send the proper data "})
    }

const projectData={

    prTitle:req.body.prTitle,
    prDescription:req.body.prDescription,
    prGithup:req.body.prGithup,
    prNetlify:req.body.prNetlify

}
const projectList=await project.create(projectData);
return res.send(projectList);

}

catch(err){
console.error(err);
res.send({message:"error in posting the data"})
}

})

app.get('/projects',(req,res)=>{

    res.send("Server is running ")
})

app.put("/projects/:id",async(req,res)=>{
    try{
    
    if(!req.body.prTitle||!req.body.prDescription||!req.body.prNetlify||!req.body.prGithup){

       return res.send({"message":"Send the proper data "})
    }
const {id}=req.params;

const list =await project.findByIdAndUpdate(id,req.body);
if(!list){
    return res.json({sms:'The book not found'})
}
return res.send({sms:"The book is updated"})


}
catch(err){
res.send({mesage:'error in delete'})
    console.log(err);
}

})

app.delete("/projects/:id",async(req,res)=>{

try{    
const {id}=req.params;

const list=await project.findByIdAndDelete(id);

if(!list){
   return  res.send("Book is not founded");
}
   return res.send('Book is deleted')


}
catch(err){

    console.log("error in the delete opration")
}

})



mongoose.connect(mongodbUrl)
.then(()=>{

    console.log("The database for portfolio connected")
    app.listen(PORT,()=>{
        console.log(`the server is running in port ${PORT}`);
    
    })
    
})
.catch((err)=>{

    console.log("Error in data base");
})


