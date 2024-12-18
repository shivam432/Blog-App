
const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const blogRoute = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/uploads/`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

blogRoute.get("/add-blog", (req, res) => {
  return res.render("addBlog", { user: req.user });
});


blogRoute.get("/:id",async (req,res)=>{
    const blog= await Blog.findById(req.params.id).populate('author');
    const comments = await Comment.findById({blog:req.params.id}).populate('author');

    // log(blog);
    // log(comments);

    return res.render('blog',{
        user:req.user,
        blog:blog,
        comments:comments
    });
})

blogRoute.post("/",upload.single("coverImage"), async (req, res) => {
//   log(req.body);
//   log(req.file);

  const {blogTitle , blog}=await req.body;

  const blg = await Blog.create({
    title:blogTitle,
    body:blog,
    coverImageURL: `/uploads/${req.file.filename}`,
    author:req.user.id
  })
  
  return res.redirect(`/blog/${blg._id}`);
});

blogRoute.post('/comment/:blogId',async (req,res)=>{
    const {content} = await req.body;
    console.log(content)
    const comment = await Comment.create({
        content:content,
        author:req.user.id,
        blog:req.params.blogId
    });

    console.log(comment)

    return res.redirect(`/blog/${req.user.id}`);
});

module.exports = blogRoute;
