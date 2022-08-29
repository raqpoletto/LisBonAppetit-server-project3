const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: { type: String, required: [true, "Please enter a password"] },
  imageProfile: { type: String },
  name: { type: String, required: [true, "Please enter a name"] },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  favourites: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const User = model("User", userSchema);

module.exports = User;
