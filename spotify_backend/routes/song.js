const express = require("express");
const passport = require("passport");
const router = express.Router();
const Song = require("../models/Song");
const UserModel = require("../models/User");
const { uploadSong } = require("../utils/helpers");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  uploadSong.single("track"),
  async (req, res) => {
    //req.user will have user details from passport
    const { name, thumbnail } = req.body;
    const artist = req.user._id;

    if (!name || !thumbnail)
      return res
        .status(301)
        .json({ error: "Insufficient details to create song" });

    const songDetails = {
      name,
      thumbnail,
      track: req.file.location,
      artist,
      dateOfRelease: new Date(),
    };
    try {
      const newSong = await Song.create(songDetails);
      return res.status(201).json(newSong);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userSongs = await Song.find({ artist: req.user._id }).populate(
        "artist"
      );
      console.log(userSongs);
      return res.status(200).json({ data: userSongs });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // console.log(req.params);
    const { artistId } = req.params;
    if (!artistId) return res.status(400).json({ error: "Insufficient Data" });
    try {
      const user = await UserModel.findById(artistId);
      if (!user)
        return res.status(301).json({ error: "Aritist does not exists" });
      const songs = await Song.find({ artist: artistId });
      console.log(songs);
      return res.status(200).json({ data: songs });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/get/name/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params;
    if (!songName) return res.status(400).json({ error: "Insufficient Data" });
    try {
      const regex = new RegExp(songName, "i");
      const songs = await Song.find({ name: { $regex: regex } }).populate(
        "artist"
      );
      console.log(songs);
      return res.status(200).json({ data: songs });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Internal server error" });
    }
  }
);
module.exports = router;
