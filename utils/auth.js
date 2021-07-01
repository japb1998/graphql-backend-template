var jwt = require('jsonwebtoken');
require("dotenv").config();
let JWTSecret = process.env.JWT_SECRET

const generateToken = (user) => {
const token =  jwt.sign({
    data: { username: user.username,
    email:user.email,
name:user.name }
  }, JWTSecret , { expiresIn: '1h' });
  return token
}

module.exports = { 
    generateToken
}
