const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const bcrypt = require("bcrypt"); // ℹ️ Handles password encryption
const mongoose = require("mongoose");
const saltRounds = 10; // How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const User = require("../models/User.model"); // Require the User model in order to interact with the database

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("the token: (or not)", req.payload);

  res.status(200).json(req.payload);
});

router.post("/signup", (req, res) => {
  const { email, name, password } = req.body;

  if (!name) {
    return res.status(400).json({ errorMessage: "Please provide your name." });
  }
  if (!email) {
    return res.status(400).json({ errorMessage: "Please provide your email." });
  }
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */

  // Search the database for a user with the email submitted in the form
  User.findOne({ email }).then((found) => {
    // If the user is found, send the message email is taken
    if (found) {
      return res.status(400).json({ errorMessage: "Email already taken." });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          name,
          password: hashedPassword,
          email,
        });
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              "Email need to be unique. The email you chose is already in use.",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ errorMessage: "Please provide your email." });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ email })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(400).json({ errorMessage: "Wrong credentials." });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Wrong credentials." });
        }

        const { _id, email, imageProfile, name, role, comments } = user; // destructuring the user object, that's what i need to send to the client

        const payload = {
          _id,
          email,
          imageProfile,
          name,
          role,
          comments,
        }; //i want those on the user profile

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "30 days",
        });

        return res.status(200).json({ authToken });
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

module.exports = router;
