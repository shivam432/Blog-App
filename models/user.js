const {Schema , model} = require('mongoose')
const crypto = require('crypto');
const { createToken } = require('../services/authentication');

const userSchema=new Schema(
    {
        fullName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        salt:{
            type:String,
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:'user'
        },
        profileImageUrl:{
            type:String,
            default:"./public/images/deafult.jpg"
        }
    },{timestamps:true}
);

userSchema.pre('save',function(next){
    const user = this;

    if(!user.isModified("password")) return ;

    const salt = crypto.randomBytes(16).toString();
    const hashedMap = crypto.createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password = hashedMap;

    next();
});

userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
    const user = await this.findOne({email});

    // console.log(user);
    

    if(!user){
        throw new Error("User not found");
    }

    const salt= user.salt;
    const hashedPassword = user.password;

    const hashmap = crypto.createHmac("sha256",salt).update(password).digest("hex");

    if(hashedPassword !== hashmap){
        throw new Error("Password does not match");
    }else{
        const token = createToken(user);
        return token;
    }
})

const User= model('User',userSchema);

module.exports=User;