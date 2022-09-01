const { Schema, model } = require("mongoose");
//isso é um teste
const restaurantSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  contact: { type: String },
  address: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  averagePrice: { type: Number },
  typeOfFood: { type: String },
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
