/*import bcrypt from "bcryptjs";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const matchPassword = async (password, savedPassword) =>
  await bcrypt.compare(password, savedPassword);
*/
const bcrypt = require('bcryptjs');
const helpers = {};


helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
helpers.matchPassword = async (password, savedPassword)=> {
  try {
    return await bcrypt.compare(password, savedPassword);
  }catch(e){
    console.log(e);
  }
  
}
module.exports = helpers;