const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRouter = require("./routes/auth");
const songRouter = require("./routes/song");
const playlistRouter = require("./routes/playlist");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/song", songRouter);
app.use("/playlist", playlistRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Connect to mongo
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => console.log(`Connected to DB`))
  .catch((e) => console.log(e));

//passport js for auth
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // User.findOne({ id: jwt_payload.sub }, function (err, user) {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //     // or you could create a new account
    //   }
    // });
    User.findOne({ _id: jwt_payload.identifier })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((e) => {
        return done(e, false);
      });
  })
);
const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started at 4000`));
