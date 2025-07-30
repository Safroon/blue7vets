const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: String,
  address: String,
  pets: [
    {
      name: String,
      type: String,
      age: Number,
    },
  ],
});

module.exports = mongoose.model('Owner', ownerSchema);
