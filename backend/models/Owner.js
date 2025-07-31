const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
  // petId: { type: String, unique: true },
});

const ownerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  address: { type: String },
  pets: [petSchema],
  // ownerId: { type: String, unique: true },
});

module.exports = mongoose.model('Owner', ownerSchema);
