const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: { type: String, required: [true, "Please enter a password"] },
  imageProfile: {
    type: String,
    default:
      "https://res.cloudinary.com/poletto/image/upload/v1661979497/Restaurants/06DC472B-0797-4B7E-A449-126107E448E7_1_201_a_a5rglb.jpg",
  },
  name: { type: String, required: [true, "Please enter a name"] },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  favourites: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const User = model("User", userSchema);

module.exports = User;
