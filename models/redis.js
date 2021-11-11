const client = require('../db/redisConnection');

function setToken(email, refreshToken) {
  return new Promise((resolve, reject) => {
    client.set(email, refreshToken, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
}

function deleteToken(key) {
  return new Promise((resolve, reject) => {
    client.del(key, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
}

function getToken(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
}

module.exports = {
  setToken,
  getToken,
  deleteToken,
};