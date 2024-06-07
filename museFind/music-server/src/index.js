require("./models/User");
require("./models/MusicEntry");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const musicRoutes = require("./routes/musicRoutes");
const requireAuth = require("./middlewares/requireAuth");
//import neccasary modules/components


//using express to create a server, set up middleware, and routes, defined in the authRoutes and musicRoutes files
const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(musicRoutes);
//using mnogoose to connect to the mongoDB database, provided is the url to the database
const mongoUri = "mongodb+srv://travisjb0:HOIEdGzfo6rtLa6n@cluster0.wil1gx9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//connect to mongoDB database, on its connection log 'connected to mongo instance. Or error if not.'
mongoose.set("strictQuery", true);
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});
//set up the authentication route (requireAuth) and send a response with their email
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});
//set up the server to listen on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});