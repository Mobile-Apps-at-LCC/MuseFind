const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const MusicEntry = mongoose.model('MusicEntry');
//import neccasary modules/components

const router = express.Router();
//using express to create a server, set up middleware, and routes, defined in the authRoutes and musicRoutes files
router.use(requireAuth);
//router.use will require the user to be authenticated before they can access the music routes/ an authentication check will be performed
router.get('/music', async (req, res) => {
  const entries = await MusicEntry.find({ userId: req.user._id });
  res.send(entries);
});
//this will post the music entry to the database, and send the entry back to the user, it destructures the trackName, artistName, genre, audioFile, and image from the request body
router.post('/music', async (req, res) => {
  const { trackName, artistName, genre, audioFile, image } = req.body;
  //within the try block, a new music entry is created with the trackName, artistName, genre, audioFile, image, and userId
  //then the music entry is saved, and sent back to the user
  //if an error occurs, the error is caught and sent back to the user
  try {
    const musicEntry = new MusicEntry({
      trackName,
      artistName,
      genre,
      audioFile,
      image,
      userId: req.user._id
    });
    await musicEntry.save();
    res.send(musicEntry);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});
//export the router
module.exports = router;