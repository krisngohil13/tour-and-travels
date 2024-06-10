import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const errorHandler = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return errorHandler(res, 401, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id; // Use _id as userId

    // Fetch the user from the database using the userId (_id)
    const user = await User.findById(userId);

    if (!user) {
      return errorHandler(res, 401, 'Invalid token');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return errorHandler(res, 401, 'Invalid token');
  }
};

export const verifyUser = (req, res, next) => {
  // Get the token from the authorization header
  const token = req.headers.authorization;

  // If no token is provided, return an error
  if (!token) {
    return errorHandler(res, 401, 'No token provided');
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If verification fails, return an error
      return errorHandler(res, 403, 'Failed to authenticate token');
    } else {
      // If verification is successful, check if the user is an admin
      if (decoded.role === 'user') {
        req.user = decoded; // Set the decoded user information to the request object
        next(); // Call the next middleware
      } else {
        return errorHandler(res, 403, 'Access denied'); // If the user is not an admin, return an error
      }
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  // Get the token from the authorization header
  const token = req.headers.authorization;

  // If no token is provided, return an error
  if (!token) {
    return errorHandler(res, 401, 'No token provided');
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If verification fails, return an error
      return errorHandler(res, 403, 'Failed to authenticate token');
    } else {
      // If verification is successful, check if the user is an admin
      if (decoded.role === 'admin') {
        req.user = decoded; // Set the decoded user information to the request object
        next(); // Call the next middleware
      } else {
        return errorHandler(res, 403, 'Access denied'); // If the user is not an admin, return an error
      }
    }
  });
};

export default verifyToken;
