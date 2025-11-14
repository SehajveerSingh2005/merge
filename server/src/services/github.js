const GitHubStrategy = require('passport-github2').Strategy;
const prisma = require('../config/database');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Configure GitHub OAuth strategy
const githubStrategy = new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:5000/api/auth/github/callback',
  scope: ['user:email', 'read:user', 'user:profile']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists in our database
    let user = await prisma.user.findUnique({
      where: { githubId: profile.id }
    });

    if (user) {
      // Update user info if needed
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: profile.displayName || profile.username,
          email: profile.emails && profile.emails[0] ? profile.emails[0].value : user.email,
          image: profile.photos && profile.photos[0] ? profile.photos[0].value : user.image,
          githubUsername: profile.username,
          githubId: profile.id,
          bio: profile._json.bio || user.bio,
          location: profile._json.location || user.location,
          website: profile._json.blog || user.website
        }
      });
    } else {
      // Create new user
      // Email can now be null since we made it optional in the schema
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      
      // Generate a unique username if the GitHub username is not available or already taken
      let username = profile.username;
      if (!username) {
        username = `github_${profile.id}`;
      } else {
        // Check if username already exists and make it unique if needed
        const existingUserWithUsername = await prisma.user.findUnique({
          where: { username }
        });
        
        if (existingUserWithUsername) {
          username = `${profile.username}_${profile.id}`;
        }
      }
      
      user = await prisma.user.create({
        data: {
          githubId: profile.id,
          name: profile.displayName || profile.username || username,
          username: username,
          email: email,
          image: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
          githubUsername: profile.username,
          bio: profile._json.bio || null,
          location: profile._json.location || null,
          website: profile._json.blog || null
        }
      });
    }

    // Generate JWT token
    const token = generateToken(user.id);
    
    // Pass just the user object to the callback for Passport serialization
    // The token will be handled separately in the callback route
    return done(null, user);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    return done(error, null);
  }
});

// Passport serialization/deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
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
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = githubStrategy;