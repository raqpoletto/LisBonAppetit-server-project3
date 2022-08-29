const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const Restaurant = require("../models/Restaurant.model");
const Comment = require("../models/Comment.model");

router.post("/restaurant/comments", isAuthenticated, (req, res, next) => {
  const { restaurant, content, imageUrl } = req.body;
  const { _id } = req.payload;
  console.log(req.body);
  let newComment;

  Comment.create({ author: _id, restaurant, content, imageUrl })
    .then((comment) => {
      newComment = comment;
      return Restaurant.findByIdAndUpdate(
        restaurant,
        { $push: { comments: newComment._id } },
        { new: true }
      );
    })
    .then(() => {
      return User.findByIdAndUpdate(
        author,
        { $push: { comments: newComment._id } },
        { new: true }
      );
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/restaurant/comments/:commentId", (req, res, next) => {
  const { commentId } = req.params;
  const { _id } = req.payload;

  Comment.findById(commentId)
    .then((foundComment) => {
      if (foundComment.author != _id) {
        res.status(403).json({ errorMessage: "You don´t have permisson" });
        return;
      } else {
        Comment.findByIdAndUpdate(commentId, req.body, { new: true }).then(
          (response) => res.json(response)
        );
      }
    })
    .catch((err) => res.json(err));
});

router.delete("/restaurant/comments/:commentId", (req, res, next) => {
  const { commentId } = req.params;
  const { _id } = req.payload;
  let deletedComment;

  Comment.findById(commentId)

    .then((foundComment) => {
      if (foundComment.author != _id) {
        res.status(403).json({ errorMessage: "You don´t have permisson" });
        return;
      } else {
        Comment.findByIdAndRemove(commentId)
          .then((comment) => {
            deletedComment = comment;
            return Restaurant.findByIdAndUpdate(
              deletedComment.restaurant,
              { $pull: { comments: commentId } },
              { new: true }
            );
          })
          .then(() => {
            return User.findByIdAndUpdate(
              deletedComment.author,
              { $pull: { comments: commentId } },
              { new: true }
            );
          })
          .then((response) => res.json(response));
      }
    })
    .catch((err) => res.json(err));
});

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

module.exports = router;
