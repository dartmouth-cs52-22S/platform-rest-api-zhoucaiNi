import jwt from 'jwt-simple';
import User from '../models/user_model';

export const signin = (user) => {
  const token = tokenForUser(user);
  return token;
};

// note the lovely destructuring here indicating that we are passing in an object with these 3 keys
export const signup = async ({ userName, email, password }) => {
  if (!userName || !email || !password) {
    throw new Error('You must provide email and password');
  }

  // See if a user with the given email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
  // If a user with email does exist, return an error
    throw new Error('Email is in use');
  }
  // 🚀 TODO:
  // here you should use the User model to create a new user.
  // this is similar to how you created a Pos
  // and then save and return a token
  const user = new User();

  user.userName = userName;
  user.email = email;
  user.password = password;

  await user.save();
  return tokenForUser(user);
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
