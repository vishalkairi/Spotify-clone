const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    private: true,
  },
  password: {
    type: String,
    required: true,
  },
  likedSongs: {
    type: String,
    default: "",
  },
  likedPlaylist: {
    type: String,
    default: "",
  },
  subscribedArtist: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("User", User);
module.exports = UserModel;
