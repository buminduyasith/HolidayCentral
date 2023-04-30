var jwt = require("jsonwebtoken");
const userRoles = require('../enums/userRoles')

async function verifyTokenAndSetUser(req, res, next) {
    const authHeader = req.get("authorization");
    try {
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            console.log("token", token);
            if (token) {
                const user = await jwt.verify(token, process.env.TOKENSECRET);
                req.user = user;
                next();
            } else {
                next();
            }
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        next();
    }
}

function isLoggedIn(role) {
   return(req,res,next)=>{
    if (!req.user) {
        const error = new Error("UnAuthorized");
        res.status(401);
        return next(error);
    }
    if(req.user.role != role){
        const error = new Error("Forbidden");
        res.status(403);
        return next(error);
    }
    next()
   }
}

module.exports = {
    verifyTokenAndSetUser,
    isLoggedIn,
};
