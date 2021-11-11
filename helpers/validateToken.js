const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function authenticateToken(request, response, next) {
  const authHeader = request.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) {
    return response.status(401).json({
      "message": "Couldn't validate token",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return response.status(403).json({
        "message": "User do not have access",
      });
    }
    request.user = user;
    next();
  });
}