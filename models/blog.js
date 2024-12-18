const {Schema , model} = require('mongoose');

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImageURL:{
        type:String,
        required:false
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
},{timestamps:true});

const Blog = model('Blog',blogSchema);

module.exports=Blog;