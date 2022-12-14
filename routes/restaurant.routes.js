const router = require("express").Router();
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Restaurant = require("../models/Restaurant.model");

//GET all restaurants
router.get("/restaurant", (req, res, next) => {
  Restaurant.find()
    .populate("comments")
    .then((restaurant) => res.status(200).json(restaurant))
    .catch((err) => res.json(err));
});

//Create a new restaurant so I can test it - admin only
//If user.role === "user" and admin
router.post("/restaurant", (req, res, next) => {
  const {
    name,
    description,
    imageUrl,
    contact,
    address,
    averagePrice,
    typeOfFood,
  } = req.body;

  Restaurant.create({
    name,
    description,
    imageUrl,
    contact,
    address,
    averagePrice,
    typeOfFood,
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//UPDATE restaurant by id - req.body has to have the same name as the model

router.put("/restaurant/:restaurantId", (req, res, next) => {
  const { restaurantId } = req.params;
  const {
    name,
    description,
    address,
    contact,
    comments,
    averagePrice,
    imageUrl,
    typeOfFood,
  } = req.body;

  Restaurant.findByIdAndUpdate(restaurantId, req.body, { new: true })

    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//DELETE restaurant by id
router.delete("/restaurant/:restaurantId", (req, res, next) => {
  const { restaurantId } = req.params;

  Restaurant.findByIdAndRemove(restaurantId)

    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//Find restaurant by id
router.get("/restaurant/:restaurantId", (req, res, next) => {
  const { restaurantId } = req.params;

  Restaurant.findById(restaurantId)
    .populate("comments")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//so the user can comment
router.get("/restaurants", (req, res, next) => {
  Restaurant.find()
    .populate("comments")
    .then((allRestaurants) => res.json(allRestaurants))
    .catch((err) => res.json(err));
});

router.get("/restaurants/:restaurantId", (req, res, next) => {
  const { restaurantId } = req.params;

  Restaurant.findById(restaurantId)
    .populate("comments")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
