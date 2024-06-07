const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//import neccasary modules/components


//create a user schema with an email and password field, this will be used to create a new user, it is defined by its type a string. 
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


//first check if the password has been modified, if it has not been modified, call next, this is a middleware function that
//will be called before the user is saved to the database
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
//generate a salt with 10 rounds, then hash the user's password with the salt, and set the user's password to the hash. 
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      resolve(isMatch);
    });
  });
};

mongoose.model('User', userSchema);