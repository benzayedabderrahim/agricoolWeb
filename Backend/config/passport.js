const LocalStrategy = require('passport-local').Strategy;
const { Agriculteur, CommerAgricole } = require('../models');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        let user = await Agriculteur.findOne({ where: { email } });
        let userType = 'agriculteur';
        
        if (!user) {
          user = await CommerAgricole.findOne({ where: { email } });
          userType = 'commeragricole';
        }
  
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
  
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }
  
        return done(null, { id: user.id, userType });
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, { id: user.id, userType: user.userType });
  });

  passport.deserializeUser(async (userData, done) => {
    try {
      if (userData.userType === 'agriculteur') {
        const agriculteur = await Agriculteur.findByPk(userData.id);
        done(null, agriculteur);
      } else if (userData.userType === 'commeragricole') {
        const commerAgricole = await CommerAgricole.findByPk(userData.id);
        done(null, commerAgricole);
      } else {
        throw new Error('Invalid user type');
      }
    } catch (error) {
      done(error);
    }
  });
};
