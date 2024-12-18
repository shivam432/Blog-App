const JWT = require('jsonwebtoken')

const secret= 'Goku@123';

function createToken(user){
    const payload = {
        id:user._id,
        email:user.email,
        profileImage:user.profileImageUrl,
        role:user.role
    };

    const token= JWT.sign(payload,secret);

    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    // console.log(token);
    
    return payload;
}

module.exports={
    createToken,
    validateToken
};