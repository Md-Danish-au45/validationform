// const jwt = require("jsonwebtoken");

// // Define your JWT secret key
// const jwtSecret = 'danish';

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. Token is missing' });
//   }

//   try {
//     // Verify the token and decode it
//     const decoded = jwt.verify(token.split(' ')[1], jwtSecret);
//     req.email = decoded.email; // Assuming the email is stored in the JWT payload
//     next();
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return res.status(401).json({ message: 'Invalid token', error: error.message });
//   }
// };

// module.exports = verifyToken;
const jwt = require("jsonwebtoken");

// Define your JWT secret key
const jwtSecret = 'danish';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. Token is missing or invalid' });
  }

  try {
    // Extract the token excluding 'Bearer ' prefix
    const tokenWithoutBearer = token.split(' ')[1];

    // Verify the token and decode it
    const decoded = jwt.verify(tokenWithoutBearer, jwtSecret);
    
    // Set decoded email or other information in the request object
    req.decoded = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = verifyToken;
