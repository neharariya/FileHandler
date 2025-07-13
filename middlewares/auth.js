
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function auth(req,res,next){

    const token = req.cookies?.token;
    // console.log("cookie",req.cookies);
    

    if(!token){

        return res.status(401).json({message: "unauthorized"});
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded;
        return next();


    }catch(err){

        return res.status(401).json({message: "unauthorized"});

    }
   
}

module.exports = auth;