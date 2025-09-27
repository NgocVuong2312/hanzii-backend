import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPass = await bcrypt.hash(password, salt);
  
  return hashPass;
};

export const comparePassword = async (password, dbPass) => {
    console.log(password+" "+ dbPass);
  const verifiedPassword = await bcrypt.compare(password, dbPass);
  return verifiedPassword;
};
