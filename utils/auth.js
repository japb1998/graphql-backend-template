var jwt = require('jsonwebtoken');

const generateToken = (user) => {
const token =  jwt.sign({
    data: { username: user.username,
    email:user.email,
name:user.name }
  }, 'secret', { expiresIn: '1h' });
  return token
}

module.exports = { 
    generateToken
}
