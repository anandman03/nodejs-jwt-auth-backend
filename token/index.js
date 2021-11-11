const crypto = require('crypto');

const token = crypto.randomBytes(64).toString('hex');
console.log(token);