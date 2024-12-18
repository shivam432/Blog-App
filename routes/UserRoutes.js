const {Router} = require('express')
const User = require('../models/user');

const route =  Router();

route.get('/signin', (req,res)=>{
    return res.render('signin');
});

route.get('/signup',(req,res)=>{
    return res.render('signup')
});

route.post('/signin',async (req,res)=>{
    const {email,password}=req.body;

    try {
        const token = await User.matchPasswordAndGenerateToken(email,password);

        if(!token){
            return res.send("Wrong Password")
        }

        return res.cookie('token',token).redirect("/");
    } catch (error) {
        return res.render('signin',{error:'Incorrect Email or password!!!'});
    }
});

route.post('/signup',async (req,res)=>{
    const {fullName,email,password}=req.body;

    const user=await User.create({
        fullName,
        email,
        password
    });

    return res.redirect("/");
});

route.get('/logout', (req,res)=>{
    return res.clearCookie('token').redirect('/');
})

module.exports = route;