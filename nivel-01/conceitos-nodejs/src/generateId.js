const crypto = require('crypto');

function generateId(){
  const id = crypto.randomBytes(8).toString('hex');
  return id;
}

module.exports = generateId; 