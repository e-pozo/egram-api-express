const bcrypt = require('bcrypt');

async function hash(payload) {
  const digest = await bcrypt.hash(payload, 10);
  return digest;
}

function compare(plainPassword, storedPassword) {
  return bcrypt.compare(plainPassword, storedPassword);
}

module.exports = {
  hash,
  compare,
};
