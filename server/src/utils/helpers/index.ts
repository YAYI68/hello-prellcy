import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomError from "../error/CustomError";

//  HASHING AND COMPARISON

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  return bcrypt.hash(password, salt);
};
export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

// CREATE JWT TOKEN
type JWTUSER = {
  userId: string;
  role?: string;
};

type optionsType = { expiresIn: string | number };
export const createJwt = (user: JWTUSER, options: optionsType) => {
  const token = jwt.sign(
    { userId: user.userId },
    process.env.JWT_SECRET,
    options
  );
  return token;
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded as { userId: string };
  } catch (error) {
    throw new CustomError("Invalid Token", 403);
  }
};

// Cloudinary
