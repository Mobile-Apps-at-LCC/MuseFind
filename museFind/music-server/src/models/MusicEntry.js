const mongoose = require('mongoose');
//import neccasary modules/components

//create a music entry schema with a userId, trackName, artistName, genre, audioFile, and image field, this will be used to create a new music entry, it is defined by its type a string.
const musicEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  trackName: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  audioFile: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});
//export the music entry schema
mongoose.model('MusicEntry', musicEntrySchema);