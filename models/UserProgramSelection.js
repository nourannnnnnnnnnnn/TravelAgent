const mongoose = require('mongoose');

const userProgramSelectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  programId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Program' },
  location: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Location' },  // Change location to ObjectId and reference 'Location'
  accommodationId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Accommodation' },
  transportationId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Transportation' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserProgramSelection', userProgramSelectionSchema);
