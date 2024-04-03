const User = require("../models/User");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const getToken = async (email, user) => {
  const token = jwt.sign({ identifier: user._id }, "secret");
  return token;
};

const client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

const s3Storage = multerS3({
  s3: client, // s3 instance
  bucket: "spotify-song-bucket", // change it as per your project requirement
  // acl: "public-read", // storage access type
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName = req.user._id + "/" + file.originalname;
    cb(null, fileName);
  },
});

const uploadSong = multer({
  storage: s3Storage,

  limits: {
    fileSize: 1024 * 1024 * 6, // 2mb file size
  },
});

module.exports = { getToken, s3Storage, uploadSong };
