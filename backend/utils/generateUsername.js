const crypto = require("crypto");

const generateUsername = (name) => {
  if (!name) return "user" + crypto.randomInt(1000, 9999); 
  
  let baseUsername = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

  const randomSuffix = crypto.randomInt(1000, 9999);

  return `${baseUsername}${randomSuffix}`;
};

module.exports = generateUsername;