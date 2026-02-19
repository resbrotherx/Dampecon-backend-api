const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String },
  occupation: { type: String },
  comment: { type: String, required: true },
  profileImage: { type: String }, // path or URL

  // Optional: link to a project
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },

  isApproved: { type: Boolean, default: false } // optional moderation
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);