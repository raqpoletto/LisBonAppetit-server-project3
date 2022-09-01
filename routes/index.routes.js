const router = require("express").Router();
const authRoutes = require("./auth.routes");
const fileUploader = require("../config/cloudinary.config");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});
// Upload
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  console.log(req.file.path);
  res.json({ fileUrl: req.file.path });
});

router.use("/auth", authRoutes);
module.exports = router;
