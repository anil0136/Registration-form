const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { error } = require('console');

const app = express ();
dotenv.config();
app.use(express.static('public'));

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD

mongoose.connect(`mongodb+srv://${username}:${password}@charliee01.qqyy2ji.mongodb.net/registrationDataDB`);

const port = 3000;

const RegistrationSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const Registration = mongoose.model("Registration",RegistrationSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/pages/index.html");
})

app.post("/register", async (req,res)=>{
    try{
        const {name,email, password}=req.body;
        const existinguser= await Registration.findOne({email:email});
        if(!existinguser){
            const RegistrationData = new Registration({
                name,email,password
            })
        }
        else{
            alert("user already exist");
            res.redirect('/error');
        }
        const RegistrationData = new Registration({
            name,email,password
        })
      await RegistrationData.save();
      res.redirect('/success');

    }catch{
        console.log(error);
        res.redirect("error");
 
    }
    app.get("/success",(req,res)=>{
        res.sendFile(__dirname+"/pages/success.html");
    }) ;
    app.get("/error",(req,res)=>{
        res.sendFile(__dirname+"/pages/error.html");
    });
})

app.listen(port,()=>(
    console.log(`server is running on port ${port}`)
))