const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

const authenticateToken = async (req, res, next) => {
  try {
    let token = null;
    
    // Check for token in Authorization header
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      token = authHeader.split(' ')[1]; // Bearer TOKEN
    }
    
    // If not in header, check for token in cookies
    if (!token && req.cookies) {
      token = req.cookies.auth_token;
    }

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        image: true,
        bio: true,
        location: true,
        website: true,
        githubUsername: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    let token = null;
    
    // Check for token in Authorization header
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      token = authHeader.split(' ')[1]; // Bearer TOKEN
    }
    
    // If not in header, check for token in cookies
    if (!token && req.cookies) {
      token = req.cookies.auth_token;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
          image: true
        }
      });
      req.user = user;
    }
    
    next();
  } catch (error) {
    // Continue without user if token is invalid
    next();
  }
};

module.exports = {
  authenticateToken,
  optionalAuth
};