const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const User = require("../models/User");
const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs)
      return res.status(301).json({ error: "Insufficient Data" });
    const currentUser = req.user;
    try {
      const newPlaylist = await Playlist.create({
        name,
        thumbnail,
        songs,
        owner: currentUser._id,
        collaborators: [],
      });

      return res.status(201).json({ newPlaylist });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error });
    }
  }
);

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { playlistId } = req.params;
    const currentUser = req.user;
    if (!playlistId) return res.status(301).json({ error: "Insufficient ID" });
    try {
      const playlist = await Playlist.findOne({
        _id: playlistId,
      }).populate({
        path: "songs",
        populate: {
          path: "artist",
        },
      });

      console.log(playlist);
      return res.status(200).json(playlist);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error });
    }
  }
);
router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.user._id;
    console.log(artistId);
    if (!artistId) return res.status(301).json({ error: "Insufficient ID" });

    try {
      const playlist = await Playlist.find({
        owner: artistId,
      }).populate("owner");
      console.log(playlist);
      return res.status(200).json(playlist);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error });
    }
  }
);

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params;
    console.log(artistId);
    if (!artistId) return res.status(301).json({ error: "Insufficient ID" });

    try {
      const artist = await User.findOne({ _id: artistId });
      if (!artist) return res.status(304).json({ error: "Invalid Artist ID" });
      const playlist = await Playlist.find({
        owner: artistId,
      });
      console.log(playlist);
      return res.status(200).json(playlist);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error });
    }
  }
);

router.post(
  "/song/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    console.log(currentUser);
    const { songId, playlistId } = req.body;
    if (!songId) return res.status(304).json({ error: "Invalid Song ID" });
    if (!playlistId)
      return res.status(304).json({ error: "Invalid Playlist ID" });
    try {
      //Check if song exists
      const song = await Song.findById(songId);
      if (!song) return res.status(304).json({ error: "Invalid Song ID" });
      //Checking if user owns the playlist or is a collaborator
      const playlist = await Playlist.findById(playlistId);
      console.log(playlist);
      if (
        !playlist.owner.equals(currentUser._id) &&
        !playlist.collaborators.includes(currentUser._id)
      ) {
        return res.status(404).json({ error: "Not Allowed" });
      }
      if (playlist.songs.includes(songId)) {
        return res
          .status(200)
          .json({ data: "Song Already exists in the playlist" });
      }
      //Adding song to playlist
      playlist.songs.push(songId);
      const updatePlaylist = await playlist.save();
      return res.status(200).json(playlist);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error });
    }
  }
);

module.exports = router;
