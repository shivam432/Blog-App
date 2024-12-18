const {Schema , model} = require('mongoose')

const commentSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    blog:{
        type:Schema.Types.ObjectId,
        ref:'Blog'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

const Comment = model('Comment',commentSchema);

module.exports=Comment;