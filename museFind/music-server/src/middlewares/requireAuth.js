const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
//import neccasary modules/components



module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }
//extract the token from the authorization header, then verify the token, if the token is invalid, send a response with a error message. 
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }
    //user id is extracted from the payload. 
    const { userId } = payload;
    //user model is used to find the user document in the database, using the user id.
    const user = await User.findById(userId);
    //set to the found user doucment, and call next
    req.user = user;
    next();
  });
};