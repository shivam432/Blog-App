const { validateToken } = require("../services/authentication");

function checkforUserToken(cookieName){
    return async (req, res, next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        // console.log(tokenCookieValue);
        
        try {
            const userPayload = await validateToken(tokenCookieValue);
            // console.log(userPayload);
            req.user= userPayload;
        } catch (error) {}

        next();
    }
}

module.exports = checkforUserToken;