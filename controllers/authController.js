require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require("email-validator");

const User = require('../models/user');
const redis = require('../models/redis');
const token = require('../helpers/generateToken');


async function postSignup(request, response) {
  const { email, password } = request.body;

  // validate email format
  const emailValidator = validator.validate(email);
  if (emailValidator === false) {
    return response.status(403).json({ "message": "Wrong/Bad email" });
  }

  // validate password
  if (password.length <= 6) {
    return response.status(403).json({ "message": "Password length must be greater than 6" });
  }

  // validate if user exist
  const user = await User.findOne({ where: { email: email } });
  if (user !== null) {
    return response.status(404).json({ "message": "User already exist" });
  }

  // Hash password for security
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // create user
  const result = await User.create({ email: email, password: hashPassword });
  if (result === null) {
    return response.status(404).json({ "message": "Some error occured" });
  }
  response.status(404).json({ "message": "Success" });
}

async function postLogin(request, response) {
  const { email, password } = request.body;

  // validate email format
  const emailValidator = validator.validate(email);
  if (emailValidator === false) {
    return response.status(403).json({ "message": "Wrong/Bad email" });
  }

  // validate password
  if (password.length <= 6) {
    return response.status(403).json({ "message": "Password length must be greater than 6" });
  }

  // validate if user exist
  const user = await User.findOne({ where: { email: email } });
  if (user === null) {
    return response.status(404).json({ "message": "Email not found" });
  }

  // validate password
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword === false) {
    return response.status(403).json({ message: "Invalid password" });
  }

  // generate tokens
  const store = { credential: email };
	const accessToken = token.generateAccessToken(store);
	const refreshToken = token.generateRefreshToken(store);
  
  // add token to redis-cache <key: email, value: refresh-token>
  try {
    const result = await redis.setToken(email, refreshToken);
    console.log("refresh-token added: ", result);
  }
  catch(error) {
    return response.status(403).json({ "message": "Failed to store token" });
  }

	response.json({ accessToken, refreshToken });
}

async function deleteLogout(request, response) {
  const { credential } = request.body;

  // remove key from the redis-cache
  try {
    const result = await redis.deleteToken(credential);
    return response.status(204).json({ "message": "Token deleted successfully" }); 
  }
  catch (error) {
    response.status(404).json({ "message": "Resource not found" });
  }
}

async function postToken(request, response) {
  const { credential } = request.body;

	if (credential === null) {
		return response.status(401).json({ "message": "Invalid User" });
	}

  // get refresh-token
  let refreshToken = new String();
  try {
    refreshToken = await redis.getToken(credential);
  }
  catch (error) {
    return response.status(403).json({ "message": "No token exist" });
  }

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
		if (error) {
			return response.status(403).json({ "message": "User has no access" });
		}

		const accessToken = token.generateAccessToken({ credential: user.credential });
		response.json({ accessToken });
	});
}

module.exports = {
  postLogin,
  deleteLogout,
  postToken,
  postSignup,
};
