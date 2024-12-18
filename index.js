const path = require('path');
const express= require('express');

const route=require('./routes/Userroutes')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const cookieParser= require('cookie-parser');
const checkforUserToken = require('./middlewares/authentication');
const blogRoute = require('./routes/BlogRoutes');
const Blog = require('./models/blog');
const commroute = require('./routes/commRoutes');


const uri = `mongodb+srv://luffy040320:${process.env.MONDO_DB_ATLAS}@cluster0.zhjap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri).then(()=>{
    console.log("Mongo DB Connected")
}).catch((err)=>console.log(err));

const app=express();

const PORT=8000;

// app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs')
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkforUserToken('token'));
app.use(express.static(path.resolve("./public")));

app.get("/",async (req,res)=>{
    const allBlogs = await Blog.find({}).sort({ "createdAt": -1 });

    // log(allBlogs);
    res.render('home',{
        user:req.user,
        blogs:allBlogs
    });
});

app.use('/user',route);

app.use('/blog',blogRoute);

// app.use('/comment',commroute);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})