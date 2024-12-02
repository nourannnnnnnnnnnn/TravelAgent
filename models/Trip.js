const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  location: { type: String, required: true },
  program: { type: String, required: true },
  accommodation: { type: String, required: true },
  price: { type: Number, required: true },
  transportation: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Assuming you will have a user model
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
