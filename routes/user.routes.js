const router = require("express").Router();
const User = require("../models/User.model");

router.get("/profile/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .populate("favourites")
    .populate("comments")
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/profile/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/addfavourite", (req, res, next) => {
  const { userId, restaurantId } = req.body;

  User.findById(userId)
    .then((foundedUser) => {
      if (foundedUser.favourites.includes(restaurantId)) {
        return User.findByIdAndUpdate(
          userId,
          { $pull: { favourites: restaurantId } },
          { new: true }
        ).then((response) => res.json(response));
      } else {
        return User.findByIdAndUpdate(
          userId,
          { $push: { favourites: restaurantId } },
          { new: true }
        ).then((response) => res.json(response));
      }
    })
    .catch((err) => res.json(err));
});

module.exports = router;
