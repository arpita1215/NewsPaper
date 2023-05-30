const express = require("express");
const app = express();
const mongoose=require("mongoose");
app.use(express.json());
const databaseconnection = require("./database/dbconnections");
const AUTHORS_MODEL= require("./models/Authors");
const NEWS_MODEL = require("./models/News");
const bcrypt=require("bcrypt");  

app.post("/authors", async(req,res)=>{
    try {
        const {firstname,lastname, email,password, contact, address,numOfArticle }= req.body;

        let encryptpassword = await bcrypt.hash(password,12);

        const newauthor = new AUTHORS_MODEL({firstname, lastname, email,password:encryptpassword, contact, address,numOfArticle });
        await newauthor.save();
        res.json({success:true, data:"author's details saved"});
    } catch (error) {
        res.json({success:false, error:error.message}); 
        
    }
});

app.post("/news", async(req,res)=>{
    try {
        const {headline, description, location,author }= req.body;

        const newNews = new NEWS_MODEL({headline, description, location,author });
        await newNews.save();
        res.json({success:true, data:"News details saved"});
    } catch (error) {
        res.json({success:false, error:error.message}); 
        
    }
});


app.post("/firstName", async(req,res)=>{
    try{
        const {firstname, lastname, email,password, contact, address,numOfArticle }= req.body;
        const newauthor = new AUTHORS_MODEL({firstname, lastname, email,password, contact, address,numOfArticle });
        await newauthor.save();
        res.json({success:true, data:"author's details saved"});
    }catch(error){
        res.json({success:false, error:error.message})
        
    }
});



app.get("/allauthors", async(req,res)=>{
    try {
        const authors = await AUTHORS_MODEL.find();
        res.json({success:true, data: authors});
    } catch (error) {
        res.json({success:false}); 
        
    }
});

app.get("/allnews", async(req,res)=>{
    try {
        const news = await NEWS_MODEL.find();
        res.json({success:true, data: news});
    } catch (error) {
        res.json({success:false, error:error.message}); 
        
    }
});


app.put("/updateauthors", async(req,res)=>{
    try {
        const {contact,name} = req.body;

        const updateauthors = await AUTHORS_MODEL.findOneAndUpdate(
            {contact:contact},
            { name: name }
        );
        res.json({success:true, data: "Updated successfully"});
    } catch (error) {
        res.json({success:false, error:error.message}); 
        
    }
});


app.get("/onenews", async(req,res)=>{
    try {
        const {author} = req.body; 

        const news = await NEWS_MODEL.find({author});
        res.json({success:true, data: news});
    } catch (error) {
        res.json({success:false, error:error.message}); 
        
    }
});


app.get("/localnews", async(req,res)=>{
    try {
        const {location} = req.body; 

        const news = await NEWS_MODEL.find({location});
        res.json({success:true, data: news});
    } catch (error) {
        res.json({success:false, error:error.message}); 
        
    }
});


app.delete("/delnews", async(req,res)=>{
    try {
        const {author} = req.body; 

         await NEWS_MODEL.findOneAndDelete({author:author});
        res.json({success:true, data: "deleted successfully"});
    } catch (error) {
        res.json({success:false, error:error.message}); 
        
    }
});



databaseconnection();

let port =8000;
app.listen(port,()=> console.log(`Server is running at ${port}`))