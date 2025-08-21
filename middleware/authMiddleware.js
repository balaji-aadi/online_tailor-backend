const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Not authorized, user not found' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const checkRole = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  const hasRole = req.user.roles.some((r) => roles.includes(r));
  if (!hasRole) return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
  next();
};

exports.authorizeAdmin = checkRole(['admin']);
exports.authorizeTailor = checkRole(['tailor']);
exports.authorizeCustomer = checkRole(['customer']);

// Token refresh handler (example, not full implementation)
exports.refreshTokenHandler = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

  // verify and issue new access token logic here
};
