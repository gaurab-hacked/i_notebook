const jwt = require("jsonwebtoken");
require("dotenv").config();

const fetchuser = (req, res, next) => {
    try{
        // fetch token from header
        const token = req.header("auth-token");
        if(!token){
            return res.json({msg:"Please Register First / Invalid Token"});
        }
        const data = jwt.verify(token, process.env.SECRIT_KEY)
        req.user = data.user;
        next();    
    }catch(error){
        res.status(500).json({error, msg:"Server error"})
    }
}

module.exports = fetchuser;