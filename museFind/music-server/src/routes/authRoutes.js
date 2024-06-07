const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const router = express.Router();
//import neccasary modules/components

//define a route handler for the post/signup route and destructure the email and password from the request body
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
//define a route handler for the post/signin route and destructure the email and password from the request body
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }
//find the user by their email, if the user does not exist, send a response with the error message 'Invalid email'
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid email' });
  }
//compare the password provided by the user with the password stored in the database, if the passwords do not match, send a response with the error message 'Invalid password'
  try {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(422).send({ error: 'Invalid password' });
    }

    //if the passwords match, send a response with the user's token
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    console.error('Error comparing passwords:', err);
    return res.status(500).send({ error: 'Internal server error' });
  }
});
//export the router
module.exports = router;