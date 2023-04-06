const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const genrateToken=(payload,options)=>{
const token = jwt.sign(payload, secret, options);

 console.log("token",token)
  return(token)
}

module.exports={genrateToken}